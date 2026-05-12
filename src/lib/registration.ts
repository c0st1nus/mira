import type { Language } from "./landing-content";

export const teamSizeOptions = ["1", "2", "3", "4"] as const;

export const countryOptions = [
  "Казахстан",
  "Узбекистан",
  "Кыргызстан",
  "Россия",
  "Таджикистан",
  "Азербайджан",
  "Армения",
  "Беларусь",
  "Украина",
  "Другое",
] as const;

export const cityOptions = [
  "Астана",
  "Алматы",
  "Шымкент",
  "Ақтау",
  "Ақтөбе",
  "Атырау",
  "Жезқазған",
  "Қарағанды",
  "Көкшетау",
  "Қостанай",
  "Қызылорда",
  "Павлодар",
  "Петропавл",
  "Семей",
  "Өскемен",
  "Қонаев",
  "Талдықорған",
  "Тараз",
  "Түркістан",
  "Орал",
  "Другое",
] as const;

export const statusOptions = [
  "Студент",
  "Работающий специалист",
  "Предприниматель",
  "Фрилансер",
] as const;

export const experienceOptions = [
  "Нет опыта",
  "1-2 года",
  "3-5 лет",
  "5-10 лет",
  "10+ лет",
] as const;

const fieldNames = [
  "email",
  "teamSize",
  "teamName",
  "country",
  "countryOther",
  "city",
  "cityOther",
  "fullName",
  "phone",
  "telegram",
  "status",
  "university",
  "experience",
  "teammate1Name",
  "teammate1Email",
  "teammate1Telegram",
  "teammate2Name",
  "teammate2Email",
  "teammate2Telegram",
  "teammate3Name",
  "teammate3Email",
  "teammate3Telegram",
  "subscribed",
] as const;

export type RegistrationFieldName = (typeof fieldNames)[number];
export type RegistrationErrors = Partial<
  Record<RegistrationFieldName | "form", string>
>;
export type RegistrationValues = Partial<Record<RegistrationFieldName, string>>;

export type RegistrationActionState = {
  status: "idle" | "error" | "success";
  message: string;
  errors: RegistrationErrors;
  values: RegistrationValues;
};

export type RegistrationPayload = {
  email: string;
  teamSize: string;
  teamName: string;
  country: string;
  city: string;
  fullName: string;
  phone: string;
  telegram: string;
  status: string;
  university: string;
  experience: string;
  teammate1Name: string;
  teammate1Email: string;
  teammate1Telegram: string;
  teammate2Name: string;
  teammate2Email: string;
  teammate2Telegram: string;
  teammate3Name: string;
  teammate3Email: string;
  teammate3Telegram: string;
  subscribed: string;
};

type OptionLabels = {
  teamSize: Record<(typeof teamSizeOptions)[number], string>;
  country: Record<(typeof countryOptions)[number], string>;
  city: Record<(typeof cityOptions)[number], string>;
  status: Record<(typeof statusOptions)[number], string>;
  experience: Record<(typeof experienceOptions)[number], string>;
  subscribed: string;
};

type ValidationMessages = {
  required: string;
  emailRequired: string;
  emailInvalid: string;
  teamSize: string;
  teamName: string;
  country: string;
  countryOther: string;
  city: string;
  cityOther: string;
  fullName: string;
  phone: string;
  phoneInvalid: string;
  telegram: string;
  status: string;
  university: string;
  experience: string;
  teammateName: (index: number) => string;
  teammateEmail: (index: number) => string;
  teammateEmailInvalid: (index: number) => string;
  teammateTelegram: (index: number) => string;
  subscribed: string;
  subscriptionNotVerified: string;
  subscriptionCheckFailed: string;
  submitError: string;
  success: string;
  saveError: string;
  saveErrorHint: string;
};

export const initialRegistrationState: RegistrationActionState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};

export const registrationSheetHeaders = [
  "Дата и время заявки",
  "Email",
  "Размер команды",
  "Название команды",
  "Страна",
  "Город",
  "Полное имя",
  "Телефон",
  "Telegram",
  "Текущий статус",
  "Университет",
  "Опыт работы",
  "Сокомандник 1: имя",
  "Сокомандник 1: email",
  "Сокомандник 1: Telegram",
  "Сокомандник 2: имя",
  "Сокомандник 2: email",
  "Сокомандник 2: Telegram",
  "Сокомандник 3: имя",
  "Сокомандник 3: email",
  "Сокомандник 3: Telegram",
  "Подписка на Telegram-канал",
] as const;

export const registrationOptionLabels: Record<Language, OptionLabels> = {
  ru: {
    teamSize: {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
    },
    country: {
      Казахстан: "Казахстан",
      Узбекистан: "Узбекистан",
      Кыргызстан: "Кыргызстан",
      Россия: "Россия",
      Таджикистан: "Таджикистан",
      Азербайджан: "Азербайджан",
      Армения: "Армения",
      Беларусь: "Беларусь",
      Украина: "Украина",
      Другое: "Другое",
    },
    city: {
      Астана: "Астана",
      Алматы: "Алматы",
      Шымкент: "Шымкент",
      Ақтау: "Ақтау",
      Ақтөбе: "Ақтөбе",
      Атырау: "Атырау",
      Жезқазған: "Жезқазған",
      Қарағанды: "Қарағанды",
      Көкшетау: "Көкшетау",
      Қостанай: "Қостанай",
      Қызылорда: "Қызылорда",
      Павлодар: "Павлодар",
      Петропавл: "Петропавл",
      Семей: "Семей",
      Өскемен: "Өскемен",
      Қонаев: "Қонаев",
      Талдықорған: "Талдықорған",
      Тараз: "Тараз",
      Түркістан: "Түркістан",
      Орал: "Орал",
      Другое: "Другое",
    },
    status: {
      Студент: "Студент",
      "Работающий специалист": "Работающий специалист",
      Предприниматель: "Предприниматель",
      Фрилансер: "Фрилансер",
    },
    experience: {
      "Нет опыта": "Нет опыта",
      "1-2 года": "1-2 года",
      "3-5 лет": "3-5 лет",
      "5-10 лет": "5-10 лет",
      "10+ лет": "10+ лет",
    },
    subscribed: "Да",
  },
  en: {
    teamSize: {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
    },
    country: {
      Казахстан: "Kazakhstan",
      Узбекистан: "Uzbekistan",
      Кыргызстан: "Kyrgyzstan",
      Россия: "Russia",
      Таджикистан: "Tajikistan",
      Азербайджан: "Azerbaijan",
      Армения: "Armenia",
      Беларусь: "Belarus",
      Украина: "Ukraine",
      Другое: "Other",
    },
    city: {
      Астана: "Astana",
      Алматы: "Almaty",
      Шымкент: "Shymkent",
      Ақтау: "Aktau",
      Ақтөбе: "Aktobe",
      Атырау: "Atyrau",
      Жезқазған: "Zhezkazgan",
      Қарағанды: "Karagandy",
      Көкшетау: "Kokshetau",
      Қостанай: "Kostanay",
      Қызылорда: "Kyzylorda",
      Павлодар: "Pavlodar",
      Петропавл: "Petropavl",
      Семей: "Semey",
      Өскемен: "Oskemen",
      Қонаев: "Konaev",
      Талдықорған: "Taldykorgan",
      Тараз: "Taraz",
      Түркістан: "Turkistan",
      Орал: "Oral",
      Другое: "Other",
    },
    status: {
      Студент: "Student",
      "Работающий специалист": "Working professional",
      Предприниматель: "Entrepreneur",
      Фрилансер: "Freelancer",
    },
    experience: {
      "Нет опыта": "No experience",
      "1-2 года": "1-2 years",
      "3-5 лет": "3-5 years",
      "5-10 лет": "5-10 years",
      "10+ лет": "10+ years",
    },
    subscribed: "Yes",
  },
  kk: {
    teamSize: {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
    },
    country: {
      Казахстан: "Қазақстан",
      Узбекистан: "Өзбекстан",
      Кыргызстан: "Қырғызстан",
      Россия: "Ресей",
      Таджикистан: "Тәжікстан",
      Азербайджан: "Әзербайжан",
      Армения: "Армения",
      Беларусь: "Беларусь",
      Украина: "Украина",
      Другое: "Басқа",
    },
    city: {
      Астана: "Астана",
      Алматы: "Алматы",
      Шымкент: "Шымкент",
      Ақтау: "Ақтау",
      Ақтөбе: "Ақтөбе",
      Атырау: "Атырау",
      Жезқазған: "Жезқазған",
      Қарағанды: "Қарағанды",
      Көкшетау: "Көкшетау",
      Қостанай: "Қостанай",
      Қызылорда: "Қызылорда",
      Павлодар: "Павлодар",
      Петропавл: "Петропавл",
      Семей: "Семей",
      Өскемен: "Өскемен",
      Қонаев: "Қонаев",
      Талдықорған: "Талдықорған",
      Тараз: "Тараз",
      Түркістан: "Түркістан",
      Орал: "Орал",
      Другое: "Басқа",
    },
    status: {
      Студент: "Студент",
      "Работающий специалист": "Жұмыс істейтін маман",
      Предприниматель: "Кәсіпкер",
      Фрилансер: "Фрилансер",
    },
    experience: {
      "Нет опыта": "Тәжірибе жоқ",
      "1-2 года": "1-2 жыл",
      "3-5 лет": "3-5 жыл",
      "5-10 лет": "5-10 жыл",
      "10+ лет": "10+ жыл",
    },
    subscribed: "Иә",
  },
};

const validationMessages: Record<Language, ValidationMessages> = {
  ru: {
    required: "Заполните это поле",
    emailRequired: "Укажите email",
    emailInvalid: "Укажите корректный email",
    teamSize: "Выберите размер команды",
    teamName: "Укажите название команды",
    country: "Выберите страну",
    countryOther: "Укажите страну",
    city: "Выберите город",
    cityOther: "Укажите город",
    fullName: "Укажите полное имя",
    phone: "Укажите номер телефона",
    phoneInvalid: "Укажите номер в международном формате",
    telegram: "Укажите Telegram аккаунт",
    status: "Выберите текущий статус",
    university: "Укажите университет",
    experience: "Выберите опыт работы",
    teammateName: (index: number) => `Укажите имя сокомандника ${index}`,
    teammateEmail: (index: number) => `Укажите email сокомандника ${index}`,
    teammateEmailInvalid: (index: number) =>
      `Укажите корректный email сокомандника ${index}`,
    teammateTelegram: (index: number) =>
      `Укажите Telegram сокомандника ${index}`,
    subscribed: "Подтвердите подписку на Telegram-канал",
    subscriptionNotVerified: "Подписка на Telegram-канал не подтверждена",
    subscriptionCheckFailed:
      "Не удалось проверить подписку Telegram. Попробуйте еще раз.",
    submitError: "Проверьте поля, выделенные ниже.",
    success: "Вы успешно зарегистрированы на Mira Growth Hack.",
    saveError:
      "Не удалось сохранить заявку. Проверьте подключение и попробуйте еще раз.",
    saveErrorHint:
      "Если ошибка повторится, напишите нам в Telegram-сообщество.",
  },
  en: {
    required: "Fill out this field",
    emailRequired: "Enter your email",
    emailInvalid: "Enter a valid email",
    teamSize: "Choose your team size",
    teamName: "Enter your team name",
    country: "Choose your country",
    countryOther: "Enter your country",
    city: "Choose your city",
    cityOther: "Enter your city",
    fullName: "Enter your full name",
    phone: "Enter your phone number",
    phoneInvalid: "Use international phone format",
    telegram: "Enter your Telegram account",
    status: "Choose your current status",
    university: "Enter your university",
    experience: "Choose your work experience",
    teammateName: (index: number) => `Enter teammate ${index}'s name`,
    teammateEmail: (index: number) => `Enter teammate ${index}'s email`,
    teammateEmailInvalid: (index: number) =>
      `Enter a valid email for teammate ${index}`,
    teammateTelegram: (index: number) =>
      `Enter teammate ${index}'s Telegram account`,
    subscribed: "Confirm that you joined the Telegram channel",
    subscriptionNotVerified: "Telegram channel subscription is not confirmed",
    subscriptionCheckFailed:
      "We could not verify your Telegram subscription. Try again.",
    submitError: "Check the highlighted fields below.",
    success: "You have successfully registered for Mira Growth Hack.",
    saveError:
      "We could not save your application. Check your connection and try again.",
    saveErrorHint:
      "If the error repeats, contact us in the Telegram community.",
  },
  kk: {
    required: "Бұл өрісті толтырыңыз",
    emailRequired: "Email енгізіңіз",
    emailInvalid: "Дұрыс email енгізіңіз",
    teamSize: "Команда көлемін таңдаңыз",
    teamName: "Команда атауын енгізіңіз",
    country: "Елді таңдаңыз",
    countryOther: "Елді енгізіңіз",
    city: "Қаланы таңдаңыз",
    cityOther: "Қаланы енгізіңіз",
    fullName: "Толық атыңызды енгізіңіз",
    phone: "Телефон нөміріңізді енгізіңіз",
    phoneInvalid: "Нөмірді халықаралық форматта енгізіңіз",
    telegram: "Telegram аккаунтыңызды енгізіңіз",
    status: "Ағымдағы статусыңызды таңдаңыз",
    university: "Университетіңізді енгізіңіз",
    experience: "Жұмыс тәжірибеңізді таңдаңыз",
    teammateName: (index: number) => `${index}-сокомандниктің атын енгізіңіз`,
    teammateEmail: (index: number) =>
      `${index}-сокомандниктің email-ын енгізіңіз`,
    teammateEmailInvalid: (index: number) =>
      `${index}-сокомандник үшін дұрыс email енгізіңіз`,
    teammateTelegram: (index: number) =>
      `${index}-сокомандниктің Telegram аккаунтын енгізіңіз`,
    subscribed: "Telegram-каналға жазылғаныңызды растаңыз",
    subscriptionNotVerified: "Telegram-каналға жазылу расталмады",
    subscriptionCheckFailed:
      "Telegram жазылымын тексеру мүмкін болмады. Қайта көріңіз.",
    submitError: "Төменде белгіленген өрістерді тексеріңіз.",
    success: "Сіз Mira Growth Hack-қа сәтті тіркелдіңіз.",
    saveError:
      "Өтінімді сақтау мүмкін болмады. Байланысты тексеріп, қайта көріңіз.",
    saveErrorHint: "Қате қайталанса, Telegram-комьюнитиде бізге жазыңыз.",
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getRegistrationLanguage(formData: FormData): Language {
  const language = formData.get("language");

  if (language === "en" || language === "kk") {
    return language;
  }

  return "ru";
}

export function getRegistrationMessages(language: Language) {
  return validationMessages[language];
}

export function getRequiredTeammateCount(teamSize: string) {
  if (teamSize === "2") {
    return 1;
  }

  if (teamSize === "3") {
    return 2;
  }

  if (teamSize === "4") {
    return 3;
  }

  return 0;
}

function readValue(formData: FormData, name: RegistrationFieldName) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function hasOption<T extends readonly string[]>(
  options: T,
  value: string,
): value is T[number] {
  return options.includes(value as T[number]);
}

function getOptionLabel<T extends keyof OptionLabels>(
  language: Language,
  group: T,
  value: string,
) {
  const labels = registrationOptionLabels[language][group] as Record<
    string,
    string
  >;

  return labels[value] || value;
}

export function validateRegistrationForm(
  formData: FormData,
  language: Language,
  options: { requireSubscription?: boolean } = {},
) {
  const messages = getRegistrationMessages(language);
  const requireSubscription = options.requireSubscription ?? true;
  const values = Object.fromEntries(
    fieldNames.map((name) => [name, readValue(formData, name)]),
  ) as Record<RegistrationFieldName, string>;
  const errors: RegistrationErrors = {};

  function requireField(
    name: RegistrationFieldName,
    message = messages.required,
  ) {
    if (!values[name]) {
      errors[name] = message;
    }
  }

  function validateEmailField(name: RegistrationFieldName, message: string) {
    if (values[name] && !emailPattern.test(values[name])) {
      errors[name] = message;
    }
  }

  requireField("email", messages.emailRequired);
  validateEmailField("email", messages.emailInvalid);

  if (!hasOption(teamSizeOptions, values.teamSize)) {
    errors.teamSize = messages.teamSize;
  }

  requireField("teamName", messages.teamName);

  if (!hasOption(countryOptions, values.country)) {
    errors.country = messages.country;
  }
  if (values.country === "Другое") {
    requireField("countryOther", messages.countryOther);
  }

  if (values.country === "Казахстан") {
    if (!hasOption(cityOptions, values.city)) {
      errors.city = messages.city;
    }

    if (values.city === "Другое") {
      requireField("cityOther", messages.cityOther);
    }
  } else if (hasOption(countryOptions, values.country)) {
    requireField("cityOther", messages.cityOther);
  }

  requireField("fullName", messages.fullName);
  requireField("phone", messages.phone);
  if (values.phone && values.phone.replace(/\D/g, "").length < 10) {
    errors.phone = messages.phoneInvalid;
  }

  requireField("telegram", messages.telegram);

  if (!hasOption(statusOptions, values.status)) {
    errors.status = messages.status;
  }

  if (values.status === "Студент") {
    requireField("university", messages.university);
  }

  if (!hasOption(experienceOptions, values.experience)) {
    errors.experience = messages.experience;
  }

  const teammateCount = getRequiredTeammateCount(values.teamSize);
  if (teammateCount >= 1) {
    requireField("teammate1Name", messages.teammateName(1));
    requireField("teammate1Email", messages.teammateEmail(1));
    validateEmailField("teammate1Email", messages.teammateEmailInvalid(1));
    requireField("teammate1Telegram", messages.teammateTelegram(1));
  }
  if (teammateCount >= 2) {
    requireField("teammate2Name", messages.teammateName(2));
    requireField("teammate2Email", messages.teammateEmail(2));
    validateEmailField("teammate2Email", messages.teammateEmailInvalid(2));
    requireField("teammate2Telegram", messages.teammateTelegram(2));
  }
  if (teammateCount >= 3) {
    requireField("teammate3Name", messages.teammateName(3));
    requireField("teammate3Email", messages.teammateEmail(3));
    validateEmailField("teammate3Email", messages.teammateEmailInvalid(3));
    requireField("teammate3Telegram", messages.teammateTelegram(3));
  }

  if (requireSubscription && values.subscribed !== "yes") {
    errors.subscribed = messages.subscribed;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors, values };
  }

  const payload: RegistrationPayload = {
    email: values.email,
    teamSize: getOptionLabel(language, "teamSize", values.teamSize),
    teamName: values.teamName,
    country:
      values.country === "Другое"
        ? values.countryOther
        : getOptionLabel(language, "country", values.country),
    city:
      values.country === "Казахстан" && values.city !== "Другое"
        ? getOptionLabel(language, "city", values.city)
        : values.cityOther,
    fullName: values.fullName,
    phone: values.phone,
    telegram: values.telegram,
    status: getOptionLabel(language, "status", values.status),
    university:
      values.status === "Студент"
        ? values.university
        : values.university || "-",
    experience: getOptionLabel(language, "experience", values.experience),
    teammate1Name: teammateCount >= 1 ? values.teammate1Name : "-",
    teammate1Email: teammateCount >= 1 ? values.teammate1Email : "-",
    teammate1Telegram: teammateCount >= 1 ? values.teammate1Telegram : "-",
    teammate2Name: teammateCount >= 2 ? values.teammate2Name : "-",
    teammate2Email: teammateCount >= 2 ? values.teammate2Email : "-",
    teammate2Telegram: teammateCount >= 2 ? values.teammate2Telegram : "-",
    teammate3Name: teammateCount >= 3 ? values.teammate3Name : "-",
    teammate3Email: teammateCount >= 3 ? values.teammate3Email : "-",
    teammate3Telegram: teammateCount >= 3 ? values.teammate3Telegram : "-",
    subscribed:
      requireSubscription || values.subscribed === "yes"
        ? registrationOptionLabels[language].subscribed
        : "-",
  };

  return { ok: true as const, payload, values };
}

export function registrationPayloadToSheetRow(payload: RegistrationPayload) {
  return [
    Date.now() / 86_400_000 + 25_569,
    payload.email,
    payload.teamSize,
    payload.teamName,
    payload.country,
    payload.city,
    payload.fullName,
    payload.phone,
    payload.telegram,
    payload.status,
    payload.university,
    payload.experience,
    payload.teammate1Name,
    payload.teammate1Email,
    payload.teammate1Telegram,
    payload.teammate2Name,
    payload.teammate2Email,
    payload.teammate2Telegram,
    payload.teammate3Name,
    payload.teammate3Email,
    payload.teammate3Telegram,
    payload.subscribed,
  ];
}
