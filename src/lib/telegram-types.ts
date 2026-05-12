export type TelegramAuthPayload = {
  auth_type: "init_data" | "id_token";
  value: string;
};

export type TelegramSettingsResponse = {
  channel_url: string;
  subscription_required: boolean;
  client_id: string | null;
};

export type TelegramSubscriptionResponse = {
  subscribed: boolean;
  user_id: number | null;
};

export type ApiErrorBody = {
  error: string;
  message: string;
};
