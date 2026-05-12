# Decentra Hack

Лендинг для регистрации на хакатон с отправкой данных в Google Sheets.

## Требования

- [Bun](https://bun.sh/) >= 1.2
- Docker + Docker Compose (опционально, для production)

## Настройка окружения

1. Скопируйте пример переменных окружения:

```bash
cp .env.local.example .env.local
```

2. Заполните `.env.local` реальными значениями:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----
GOOGLE_SHEET_ID=YOUR_SHEET_ID
GOOGLE_SHEET_RANGE=Registrations!A:V
TELEGRAM_BOT_TOKEN=123456:ABCDEF
TELEGRAM_CHANNEL_ID=-1001234567890
TELEGRAM_CHANNEL_URL=https://t.me/+MhQzTZsn9ttiNzJi
TELEGRAM_CLIENT_ID=YOUR_TELEGRAM_CLIENT_ID
TELEGRAM_SUBSCRIPTION_REQUIRED=true
```

> ⚠️ **Важно:** `.env.local` содержит приватный ключ и не должен попадать в Git. Он уже добавлен в `.gitignore` и `.dockerignore`.

Для проверки Telegram-подписки бот должен быть добавлен в канал/чат, указанный в `TELEGRAM_CHANNEL_ID`. Если канал открыт через invite-ссылку, используйте numeric id вида `-100...`, а не саму ссылку.

## Локальный запуск (разработка)

```bash
# Установка зависимостей
bun install

# Запуск dev-сервера
bun dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Запуск через Docker (production)

```bash
# Сборка и запуск
docker compose up --build -d

# Просмотр логов
docker compose logs -f

# Остановка
docker compose down
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000).

Переменные окружения из `.env.local` подключаются через `docker-compose.yml` и не попадают в Docker-образ.

## Доступные скрипты

- `bun dev` — запуск dev-сервера
- `bun run build` — сборка production-версии
- `bun run start` — запуск production-сервера
- `bun run lint` — проверка кода (Biome)
- `bun run format` — форматирование кода

## Структура проекта

```
src/
  app/              # Next.js App Router
    actions.ts      # Server Actions для отправки формы
    page.tsx        # Главная страница
    registration/   # Страница регистрации
  components/       # React-компоненты
  lib/              # Утилиты и вспомогательные функции
```

## Деплой

Проект можно задеплоить на любую платформу, поддерживающую Docker, или на [Vercel](https://vercel.com).

Для Vercel не забудьте добавить переменные окружения из `.env.local` в настройках проекта.
