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
      subscriptionVerifiedLabel: "Подписка подтверждена.",
      subscriptionRequiredError:
        "Подтвердите подписку через Telegram, чтобы отправить заявку.",
      subscriptionModalTitle: "Подтвердите подписку",
      subscriptionModalDescription:
        "Откройте канал, подпишитесь и войдите через Telegram. После этого мы автоматически проверим, что вы в канале.",
      subscriptionModalOpenChannel: "Открыть канал в Telegram",
      subscriptionModalLogin: "Войти через Telegram",
      subscriptionModalPreparingLogin: "Готовим вход через Telegram...",
      subscriptionModalBrowserHint:
        "После входа мы проверим подписку и отметим чекбокс в форме.",
      subscriptionModalChecking: "Проверяем подписку...",
      subscriptionModalVerified:
        "Подписка подтверждена. Можно отправлять заявку.",
      subscriptionModalNotSubscribed:
        "Подписка не найдена. Подпишитесь на канал и попробуйте еще раз.",
      subscriptionModalRetry: "Я подписался, проверить еще раз",
      subscriptionModalLoginUnavailable:
        "Вход через Telegram временно недоступен. Попробуйте позже или откройте страницу из Telegram.",
      subscriptionModalSettingsError: "Настройки Telegram временно недоступны.",
      subscriptionModalAuthError:
        "Telegram не передал данные авторизации. Откройте страницу из Telegram или войдите через Telegram в браузере.",
      subscriptionModalGenericError:
        "Не удалось проверить подписку Telegram. Попробуйте еще раз.",
      subscriptionModalCloseLabel: "Закрыть окно проверки подписки",
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
      subscriptionVerifiedLabel: "Subscription confirmed.",
      subscriptionRequiredError:
        "Confirm your Telegram subscription before submitting the application.",
      subscriptionModalTitle: "Confirm your subscription",
      subscriptionModalDescription:
        "Open the channel, join it, and sign in with Telegram. We will then verify that you are in the channel.",
      subscriptionModalOpenChannel: "Open channel in Telegram",
      subscriptionModalLogin: "Sign in with Telegram",
      subscriptionModalPreparingLogin: "Preparing Telegram sign-in...",
      subscriptionModalBrowserHint:
        "After sign-in, we will check the subscription and mark the checkbox in the form.",
      subscriptionModalChecking: "Checking subscription...",
      subscriptionModalVerified:
        "Subscription confirmed. You can submit the application.",
      subscriptionModalNotSubscribed:
        "Subscription was not found. Join the channel and try again.",
      subscriptionModalRetry: "I joined, check again",
      subscriptionModalLoginUnavailable:
        "Telegram sign-in is temporarily unavailable. Try later or open the page from Telegram.",
      subscriptionModalSettingsError:
        "Telegram settings are temporarily unavailable.",
      subscriptionModalAuthError:
        "Telegram did not pass authorization data. Open the page from Telegram or sign in with Telegram in your browser.",
      subscriptionModalGenericError:
        "We could not verify your Telegram subscription. Try again.",
      subscriptionModalCloseLabel: "Close subscription verification dialog",
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
      subscriptionVerifiedLabel: "Жазылым расталды.",
      subscriptionRequiredError:
        "Өтінімді жіберу үшін Telegram жазылымын растаңыз.",
      subscriptionModalTitle: "Жазылымды растаңыз",
      subscriptionModalDescription:
        "Каналды ашып, жазылыңыз және Telegram арқылы кіріңіз. Содан кейін біз сіздің каналда екеніңізді тексереміз.",
      subscriptionModalOpenChannel: "Telegram каналын ашу",
      subscriptionModalLogin: "Telegram арқылы кіру",
      subscriptionModalPreparingLogin: "Telegram арқылы кіру дайындалуда...",
      subscriptionModalBrowserHint:
        "Кіргеннен кейін жазылымды тексеріп, формадағы чекбоксты белгілейміз.",
      subscriptionModalChecking: "Жазылым тексерілуде...",
      subscriptionModalVerified: "Жазылым расталды. Өтінімді жіберуге болады.",
      subscriptionModalNotSubscribed:
        "Жазылым табылмады. Каналға жазылып, қайта көріңіз.",
      subscriptionModalRetry: "Жазылдым, қайта тексеру",
      subscriptionModalLoginUnavailable:
        "Telegram арқылы кіру уақытша қолжетімсіз. Кейінірек көріңіз немесе парақшаны Telegram-нан ашыңыз.",
      subscriptionModalSettingsError:
        "Telegram баптаулары уақытша қолжетімсіз.",
      subscriptionModalAuthError:
        "Telegram авторизация деректерін жібермеді. Парақшаны Telegram-нан ашыңыз немесе браузерде Telegram арқылы кіріңіз.",
      subscriptionModalGenericError:
        "Telegram жазылымын тексеру мүмкін болмады. Қайта көріңіз.",
      subscriptionModalCloseLabel: "Жазылым тексеру терезесін жабу",
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
