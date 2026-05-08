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
      eyebrow: "",
      title: "Заполните заявку на Mira Growth Hack",
      description: "",
      badge: "Mira Pro + leaderboard",
      asideTitle: "Заявка — первый шаг к своей growth-кампании",
      asideText:
        "Можно идти одному или собрать команду до 4 человек: контент, Reels, лендинги, Telegram-боты, инфлюенсеры, SEO или совсем нестандартная механика — главное, привести пользователей в Mira.",
      notes: [
        [
          "Уникальная ссылка",
          "Твои привлеченные пользователи считаются по персональной ссылке — результат будет понятным и измеримым.",
        ],
        [
          "Leaderboard",
          "Следи за позицией: чем больше реальных регистраций ты привел в Mira, тем выше поднимаешься.",
        ],
      ].map(([title, text]) => ({ title, text })),
    },
    form: {
      selectPlaceholder: "Выберите вариант",
      successTitle: "Заявка принята!",
      successText:
        "Вся полезная информация о хакатоне, менторские сессии, сертификаты будут в нашем Telegram-сообществе. Вступите в Telegram-канал Decentrathon, чтобы ничего не пропустить!",
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
      eyebrow: "",
      title: "Apply for Mira Growth Hack",
      description: "",
      badge: "Mira Pro + leaderboard",
      asideTitle: "Your application starts the growth campaign",
      asideText:
        "Join solo or with up to 4 people: content, Reels, landing pages, Telegram bots, influencers, SEO, or something completely unexpected — the goal is to bring users to Mira.",
      notes: [
        [
          "Unique link",
          "Users you bring are counted through your personal link, so the result is clear and measurable.",
        ],
        [
          "Leaderboard",
          "Track your position: the more real Mira registrations you bring, the higher you climb.",
        ],
      ].map(([title, text]) => ({ title, text })),
    },
    form: {
      selectPlaceholder: "Choose an option",
      successTitle: "Application accepted!",
      successText:
        "All useful information about the hackathon, mentor sessions, and certificates will be in our Telegram community. Join the Decentrathon Telegram channel so you do not miss anything!",
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
      eyebrow: "",
      title: "Mira Growth Hack-қа өтінім толтырыңыз",
      description: "",
      badge: "Mira Pro + leaderboard",
      asideTitle: "Өтінім — growth-кампанияның бірінші қадамы",
      asideText:
        "Жеке қатысыңыз немесе 4 адамға дейін команда жинаңыз: контент, Reels, лендингтер, Telegram-боттар, инфлюенсерлер, SEO немесе мүлде ерекше механика — бастысы, Mira-ға қолданушы әкелу.",
      notes: [
        [
          "Жеке сілтеме",
          "Сен әкелген қолданушылар жеке сілтеме арқылы саналады, сондықтан нәтиже нақты және өлшенетін болады.",
        ],
        [
          "Leaderboard",
          "Позицияңды бақыла: Mira-ға неғұрлым көп нақты тіркелу әкелсең, соғұрлым жоғары көтерілесің.",
        ],
      ].map(([title, text]) => ({ title, text })),
    },
    form: {
      selectPlaceholder: "Нұсқаны таңдаңыз",
      successTitle: "Өтінім қабылданды!",
      successText:
        "Хакатон туралы барлық пайдалы ақпарат, менторлық сессиялар және сертификаттар біздің Telegram-комьюнитиде болады. Ештеңені жіберіп алмау үшін Decentrathon Telegram-каналына қосылыңыз!",
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
