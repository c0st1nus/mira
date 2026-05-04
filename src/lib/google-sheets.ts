import { createSign } from "node:crypto";
import { registrationSheetHeaders } from "./registration";

const tokenUrl = "https://oauth2.googleapis.com/token";
const sheetsScope = "https://www.googleapis.com/auth/spreadsheets";
const defaultRange = "Registrations!A:V";

type SheetProperties = {
  sheetId?: number;
  title?: string;
};

type SpreadsheetMetadata = {
  sheets?: { properties?: SheetProperties }[];
};

type ValuesResponse = {
  values?: string[][];
};

type BatchUpdateResponse = {
  replies?: { addSheet?: { properties?: SheetProperties } }[];
};

function encodeBase64Url(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function getPrivateKey() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("GOOGLE_PRIVATE_KEY is not configured");
  }

  return privateKey.replace(/\\n/g, "\n");
}

async function getAccessToken() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!serviceAccountEmail) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL is not configured");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = encodeBase64Url(
    JSON.stringify({
      iss: serviceAccountEmail,
      scope: sheetsScope,
      aud: tokenUrl,
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsignedToken = `${header}.${claim}`;
  const signature = createSign("RSA-SHA256")
    .update(unsignedToken)
    .sign(getPrivateKey(), "base64url");
  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google token request failed: ${response.status}`);
  }

  const data = (await response.json()) as { access_token?: string };

  if (!data.access_token) {
    throw new Error("Google token response does not include access_token");
  }

  return data.access_token;
}

function getSheetRange() {
  return process.env.GOOGLE_SHEET_RANGE || defaultRange;
}

function parseSheetTitle(range: string) {
  const [rawTitle] = range.split("!");
  const title = rawTitle || "Registrations";

  if (title.startsWith("'") && title.endsWith("'")) {
    return title.slice(1, -1).replaceAll("''", "'");
  }

  return title;
}

function formatSheetTitle(title: string) {
  if (/^[\wа-яА-ЯёЁ]+$/u.test(title)) {
    return title;
  }

  return `'${title.replaceAll("'", "''")}'`;
}

function getColumnLabel(columnCount: number) {
  let label = "";
  let current = columnCount;

  while (current > 0) {
    current -= 1;
    label = String.fromCharCode(65 + (current % 26)) + label;
    current = Math.floor(current / 26);
  }

  return label;
}

function getHeadersRange(sheetTitle: string) {
  return `${formatSheetTitle(sheetTitle)}!A1:${getColumnLabel(registrationSheetHeaders.length)}1`;
}

async function sheetsFetch<T>(
  sheetId: string,
  accessToken: string,
  path: string,
  init?: RequestInit,
) {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Google Sheets request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function batchUpdate(
  sheetId: string,
  accessToken: string,
  requests: unknown[],
) {
  return sheetsFetch<BatchUpdateResponse>(
    sheetId,
    accessToken,
    ":batchUpdate",
    {
      method: "POST",
      body: JSON.stringify({ requests }),
    },
  );
}

async function getOrCreateSheet(
  sheetId: string,
  accessToken: string,
  sheetTitle: string,
) {
  const metadata = await sheetsFetch<SpreadsheetMetadata>(
    sheetId,
    accessToken,
    "?fields=sheets.properties(sheetId,title)",
  );
  const existingSheet = metadata.sheets?.find(
    (sheet) => sheet.properties?.title === sheetTitle,
  )?.properties;

  if (existingSheet?.sheetId !== undefined) {
    return existingSheet.sheetId;
  }

  const response = await batchUpdate(sheetId, accessToken, [
    {
      addSheet: {
        properties: {
          title: sheetTitle,
          gridProperties: {
            rowCount: 1_000,
            columnCount: registrationSheetHeaders.length,
          },
        },
      },
    },
  ]);
  const createdSheetId = response.replies?.[0]?.addSheet?.properties?.sheetId;

  if (createdSheetId === undefined) {
    throw new Error("Google Sheets did not return created sheet id");
  }

  return createdSheetId;
}

async function updateHeaderValues(
  sheetId: string,
  accessToken: string,
  sheetTitle: string,
) {
  const headersRange = getHeadersRange(sheetTitle);

  await sheetsFetch(
    sheetId,
    accessToken,
    `/values/${encodeURIComponent(headersRange)}?valueInputOption=RAW`,
    {
      method: "PUT",
      body: JSON.stringify({ values: [registrationSheetHeaders] }),
    },
  );
}

async function ensureHeaders(
  sheetId: string,
  accessToken: string,
  googleSheetId: number,
  sheetTitle: string,
) {
  const headersRange = getHeadersRange(sheetTitle);
  const response = await sheetsFetch<ValuesResponse>(
    sheetId,
    accessToken,
    `/values/${encodeURIComponent(headersRange)}`,
  );
  const firstRow = response.values?.[0] ?? [];
  const hasExistingValues = firstRow.some((value) => value.trim().length > 0);
  const hasExpectedHeaders = registrationSheetHeaders.every(
    (header, index) => firstRow[index]?.trim() === header,
  );
  const looksLikeHeaderRow =
    firstRow[0]?.trim() === registrationSheetHeaders[0];

  if (hasExpectedHeaders) {
    return;
  }

  if (hasExistingValues && !looksLikeHeaderRow) {
    await batchUpdate(sheetId, accessToken, [
      {
        insertDimension: {
          range: {
            sheetId: googleSheetId,
            dimension: "ROWS",
            startIndex: 0,
            endIndex: 1,
          },
          inheritFromBefore: false,
        },
      },
    ]);
  }

  await updateHeaderValues(sheetId, accessToken, sheetTitle);
}

async function formatSheet(
  sheetId: string,
  accessToken: string,
  googleSheetId: number,
) {
  await batchUpdate(sheetId, accessToken, [
    {
      updateSheetProperties: {
        properties: {
          sheetId: googleSheetId,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        fields: "gridProperties.frozenRowCount",
      },
    },
    {
      repeatCell: {
        range: {
          sheetId: googleSheetId,
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: registrationSheetHeaders.length,
        },
        cell: {},
        fields: "userEnteredFormat",
      },
    },
    {
      repeatCell: {
        range: {
          sheetId: googleSheetId,
          startColumnIndex: 0,
          endColumnIndex: 1,
        },
        cell: {
          userEnteredFormat: {
            numberFormat: {
              type: "DATE_TIME",
              pattern: "dd.mm.yyyy hh:mm",
            },
          },
        },
        fields: "userEnteredFormat.numberFormat",
      },
    },
    {
      repeatCell: {
        range: {
          sheetId: googleSheetId,
          startColumnIndex: 1,
          endColumnIndex: registrationSheetHeaders.length,
        },
        cell: {
          userEnteredFormat: {
            numberFormat: {
              type: "TEXT",
              pattern: "@",
            },
          },
        },
        fields: "userEnteredFormat.numberFormat",
      },
    },
    {
      autoResizeDimensions: {
        dimensions: {
          sheetId: googleSheetId,
          dimension: "COLUMNS",
          startIndex: 0,
          endIndex: registrationSheetHeaders.length,
        },
      },
    },
  ]);
}

async function ensureSheetSetup(
  sheetId: string,
  accessToken: string,
  range: string,
) {
  const sheetTitle = parseSheetTitle(range);
  const googleSheetId = await getOrCreateSheet(
    sheetId,
    accessToken,
    sheetTitle,
  );

  await ensureHeaders(sheetId, accessToken, googleSheetId, sheetTitle);
  await formatSheet(sheetId, accessToken, googleSheetId);
}

export async function appendRegistrationToSheet(row: (string | number)[]) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const range = getSheetRange();

  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID is not configured");
  }

  const accessToken = await getAccessToken();
  await ensureSheetSetup(sheetId, accessToken, range);

  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets append failed: ${response.status}`);
  }
}
