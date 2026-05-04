import type { Language } from "./landing-content";
import {
  cityOptions,
  countryOptions,
  experienceOptions,
  registrationOptionLabels,
  statusOptions,
  teamSizeOptions,
} from "./registration";

function mapOptions<T extends readonly string[]>(
  options: T,
  labels: Record<T[number], string>,
) {
  return options.map((value) => ({
    value,
    label: labels[value as T[number]],
  }));
}

const copy = {
  ru: {
    section: {
      eyebrow: "Регистрация",
      title: "Заполните заявку на Mira Growth Hack",
      description:
        "Выберите формат участия, оставьте контакты и подтвердите Telegram-канал. Это займет 2-3 минуты.",
      badge: "До 4 человек",
      asideTitle: "Одна форма для соло и команд",
      asideText:
        "Если участвуете индивидуально, блок сокомандников не нужен. Для команды форма запросит данные только тех участников, которых нужно добавить.",
      notes: [
        [
          "Условные поля",
          "Поля сокомандников появятся только после выбора размера команды.",
        ],
        [
          "Сохранение",
          "После отправки заявка сохраняется в Google таблицу организаторов.",
        ],
        [
          "Проверка",
          "Форма валидируется на странице и повторно на сервере перед записью.",
        ],
      ].map(([title, text]) => ({ title, text })),
    },
    form: {
      selectPlaceholder: "Выберите вариант",
      successTitle: "Заявка отправлена",
      successText:
        "Вступите в Telegram-сообщество, чтобы не пропустить анонсы и следующие шаги.",
      successCta: "Перейти в Telegram",
      emailLabel: "Электронная почта",
      fullNameLabel: "Ваше полное имя",
      phoneLabel: "Ваш номер телефона",
      telegramLabel: "Актуальный Telegram аккаунт",
      countryLabel: "С какой страны вы участвуете?",
      countryOtherLabel: "Укажите страну",
      cityLabel: "С какого города вы участвуете?",
      cityOtherLabel: "Укажите город",
      teamSizeLegend: "Сколько человек в вашей команде?",
      statusLegend: "Ваш текущий статус?",
      teamNameLabel: "Название команды",
      teamNameHint: "",
      universityLabel: "С какого вы университета?",
      universityHint: "",
      experienceLegend: "Ваш опыт работы?",
      teammatesTitle: "Данные сокомандников",
      teammatesHint:
        "Показываем только поля, которые нужны для выбранного размера команды.",
      teammateTitlePrefix: "Сокомандник ",
      teammateTitleSuffix: "",
      teammateNameLabel: "Полное имя",
      teammateNameHint: "Пример: Камила Сакенова",
      teammateNamePlaceholder: "Имя Фамилия",
      teammateEmailLabel: "Email",
      teammateEmailHint: "Пример: kamilla@gmail.com",
      teammateEmailPlaceholder: "teammate@example.com",
      teammateTelegramLabel: "Telegram аккаунт",
      teammateTelegramHint: "Пример: @monk",
      teammateTelegramPlaceholder: "@username",
      subscribedLabel:
        "Я подписался на Telegram-канал Decentrathon-а и пригласил всех сокомандников!",
      subscribedHint:
        "В канале будут анонсы, чат с единомышленниками и эксклюзивные конкурсы.",
      telegramLinkLabel: "Открыть канал",
      submitLabel: "Отправить заявку",
      pendingLabel: "Отправляем...",
    },
  },
  en: {
    section: {
      eyebrow: "Registration",
      title: "Apply for Mira Growth Hack",
      description:
        "Choose your participation format, leave your contacts, and confirm the Telegram channel. It takes 2-3 minutes.",
      badge: "Up to 4 people",
      asideTitle: "One form for solo participants and teams",
      asideText:
        "If you join solo, you will not need teammate fields. For teams, the form asks only for the teammates required by your selected team size.",
      notes: [
        [
          "Conditional fields",
          "Teammate fields appear only after you select your team size.",
        ],
        [
          "Saved to Sheets",
          "After submission, the application is saved to the organizers' Google Sheet.",
        ],
        [
          "Validation",
          "The form is validated on the page and again on the server before saving.",
        ],
      ].map(([title, text]) => ({ title, text })),
    },
    form: {
      selectPlaceholder: "Choose an option",
      successTitle: "Application submitted",
      successText:
        "Join the Telegram community so you do not miss announcements and next steps.",
      successCta: "Open Telegram",
      emailLabel: "Email",
      fullNameLabel: "Your full name",
      phoneLabel: "Your phone number",
      telegramLabel: "Current Telegram account",
      countryLabel: "Which country are you joining from?",
      countryOtherLabel: "Enter your country",
      cityLabel: "Which city are you joining from?",
      cityOtherLabel: "Enter your city",
      teamSizeLegend: "How many people are on your team?",
      statusLegend: "What is your current status?",
      teamNameLabel: "Team name",
      teamNameHint: "",
      universityLabel: "Which university are you from?",
      universityHint: "",
      experienceLegend: "Your work experience",
      teammatesTitle: "Teammate details",
      teammatesHint:
        "Only the fields needed for your selected team size are shown.",
      teammateTitlePrefix: "Teammate ",
      teammateTitleSuffix: "",
      teammateNameLabel: "Full name",
      teammateNameHint: "Example: Kamila Sakenova",
      teammateNamePlaceholder: "First and last name",
      teammateEmailLabel: "Email",
      teammateEmailHint: "Example: kamilla@gmail.com",
      teammateEmailPlaceholder: "teammate@example.com",
      teammateTelegramLabel: "Telegram account",
      teammateTelegramHint: "Example: @monk",
      teammateTelegramPlaceholder: "@username",
      subscribedLabel:
        "I joined the Decentrathon Telegram channel and invited all teammates!",
      subscribedHint:
        "The channel has hackathon updates, a community chat, and exclusive contests.",
      telegramLinkLabel: "Open channel",
      submitLabel: "Submit application",
      pendingLabel: "Submitting...",
    },
  },
  kk: {
    section: {
      eyebrow: "Тіркелу",
      title: "Mira Growth Hack-қа өтінім толтырыңыз",
      description:
        "Қатысу форматын таңдаңыз, байланыс деректерін қалдырыңыз және Telegram-каналды растаңыз. Бұл 2-3 минут алады.",
      badge: "4 адамға дейін",
      asideTitle: "Жеке қатысушы мен командаға бір форма",
      asideText:
        "Жеке қатыссаңыз, сокомандник өрістері қажет емес. Команда таңдасаңыз, форма тек қажет қатысушылардың деректерін сұрайды.",
      notes: [
        [
          "Шартты өрістер",
          "Сокомандник өрістері команда көлемін таңдағаннан кейін ғана шығады.",
        ],
        [
          "Сақтау",
          "Өтінім жіберілгеннен кейін деректер ұйымдастырушылардың Google кестесіне сақталады.",
        ],
        [
          "Тексеру",
          "Форма бетте және серверде қайта тексеріліп барып сақталады.",
        ],
      ].map(([title, text]) => ({ title, text })),
    },
    form: {
      selectPlaceholder: "Нұсқаны таңдаңыз",
      successTitle: "Өтінім жіберілді",
      successText:
        "Анонстар мен келесі қадамдарды жіберіп алмау үшін Telegram-комьюнитиге қосылыңыз.",
      successCta: "Telegram-ға өту",
      emailLabel: "Email",
      fullNameLabel: "Толық атыңыз",
      phoneLabel: "Телефон нөміріңіз",
      telegramLabel: "Актуалды Telegram аккаунтыңыз",
      countryLabel: "Қай елден қатысасыз?",
      countryOtherLabel: "Елді енгізіңіз",
      cityLabel: "Қай қаладан қатысасыз?",
      cityOtherLabel: "Қаланы енгізіңіз",
      teamSizeLegend: "Командаңызда қанша адам бар?",
      statusLegend: "Ағымдағы статусыңыз қандай?",
      teamNameLabel: "Команда атауы",
      teamNameHint: "",
      universityLabel: "Қай университеттенсіз?",
      universityHint: "",
      experienceLegend: "Жұмыс тәжірибеңіз",
      teammatesTitle: "Сокомандниктер деректері",
      teammatesHint:
        "Таңдалған команда көлеміне қажет өрістер ғана көрсетіледі.",
      teammateTitlePrefix: "",
      teammateTitleSuffix: "-сокомандник",
      teammateNameLabel: "Толық аты",
      teammateNameHint: "Мысалы: Камила Сакенова",
      teammateNamePlaceholder: "Аты-жөні",
      teammateEmailLabel: "Email",
      teammateEmailHint: "Мысалы: kamilla@gmail.com",
      teammateEmailPlaceholder: "teammate@example.com",
      teammateTelegramLabel: "Telegram аккаунты",
      teammateTelegramHint: "Мысалы: @monk",
      teammateTelegramPlaceholder: "@username",
      subscribedLabel:
        "Мен Decentrathon Telegram-каналына жазылдым және барлық сокомандниктерді шақырдым!",
      subscribedHint:
        "Каналда хакатон жаңалықтары, комьюнити чат және эксклюзив конкурстар болады.",
      telegramLinkLabel: "Каналды ашу",
      submitLabel: "Өтінімді жіберу",
      pendingLabel: "Жіберілуде...",
    },
  },
} as const;

export function getRegistrationContent(language: Language) {
  const labels = registrationOptionLabels[language];

  return {
    ...copy[language],
    form: {
      ...copy[language].form,
      options: {
        teamSize: mapOptions(teamSizeOptions, labels.teamSize),
        country: mapOptions(countryOptions, labels.country),
        city: mapOptions(cityOptions, labels.city),
        status: mapOptions(statusOptions, labels.status),
        experience: mapOptions(experienceOptions, labels.experience),
      },
    },
  };
}

export type RegistrationContent = ReturnType<typeof getRegistrationContent>;
