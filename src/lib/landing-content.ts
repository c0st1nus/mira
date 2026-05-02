export type Language = "ru" | "en" | "kk";

export const registrationHref = "https://forms.gle/ptuXWSXY8TdYLK4t5";
export const communityHref = "https://t.me/+MhQzTZsn9ttiNzJi";

export const languages: { code: Language; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "kk", label: "KZ" },
];

const commonTracks = {
  ru: [
    [
      "Контент-завод",
      "Create",
      "Создавай AI-видео, креативы, хуки, сценарии, фото, посты и короткие форматы для соцсетей.",
    ],
    [
      "Аутрич инфлюенсеров",
      "Reach",
      "Придумывай нестандартные способы выйти на микроинфлюенсеров и довести контакт до коллаборации.",
    ],
    [
      "SEO / Лендинги",
      "Rank",
      "Собирай страницы, подборки и SEO-контент, которые ранжируются и конвертят новых пользователей.",
    ],
    [
      "Лента юзкейсов",
      "Stories",
      "Публикуй реальные use cases Mira для студентов, маркетологов, founders, креаторов и команд.",
    ],
    [
      "Комьюнити-генератор",
      "Loop",
      "Запускай реферальные цепочки, челленджи, групповых ботов, интерактивы и задания в чатах.",
    ],
    [
      "Виральные механики / Трафик",
      "Viral",
      "Собери механику, которую хочется переслать: quiz, мини-игру, мем-генератор или Telegram-бота.",
    ],
  ],
  en: [
    [
      "Content factory",
      "Create",
      "Create AI videos, hooks, scripts, visuals, posts, and short-form content for social channels.",
    ],
    [
      "Influencer outreach",
      "Reach",
      "Find creative ways to reach micro-influencers and turn the first message into a real collaboration.",
    ],
    [
      "SEO / Landing pages",
      "Rank",
      "Build landing pages, directories, and SEO content that can rank and convert new users.",
    ],
    [
      "Use case feed",
      "Stories",
      "Publish real Mira use cases for students, marketers, founders, creators, and teams.",
    ],
    [
      "Community generator",
      "Loop",
      "Launch referral loops, group bots, challenges, interactive tasks, and mechanics inside chats.",
    ],
    [
      "Viral mechanics / Traffic",
      "Viral",
      "Build something people want to share: a quiz, mini-game, meme generator, or Telegram bot.",
    ],
  ],
  kk: [
    [
      "Контент фабрикасы",
      "Create",
      "AI-видео, креатив, хук, сценарий, сурет, пост және әлеуметтік желіге қысқа форматтар жаса.",
    ],
    [
      "Инфлюенсер аутричі",
      "Reach",
      "Микроинфлюенсерлерге шығудың ерекше жолын тауып, байланысты коллаборацияға жеткіз.",
    ],
    [
      "SEO / Лендингтер",
      "Rank",
      "Рейтингке шығатын және жаңа қолданушыларды әкелетін лендингтер мен SEO-контент жаса.",
    ],
    [
      "Use case лентасы",
      "Stories",
      "Студенттер, маркетологтар, founders, креаторлар және командалар үшін Mira кейстерін жарияла.",
    ],
    [
      "Комьюнити генераторы",
      "Loop",
      "Чаттарда реферальды тізбек, челлендж, топтық бот және интерактив тапсырмалар іске қос.",
    ],
    [
      "Вирал механикалар / Трафик",
      "Viral",
      "Адамдар бөліскісі келетін quiz, мини-ойын, мем-генератор немесе Telegram-бот жаса.",
    ],
  ],
};

function mapTracks(lang: Language) {
  return commonTracks[lang].map(([title, label, description]) => ({
    title,
    label,
    description,
  }));
}

export const landingContent = {
  ru: {
    nav: ["Что это?", "Призы", "Треки", "Этапы", "Mira", "Таймлайн", "FAQ"],
    cta: "Зарегистрироваться",
    community: "Войти в сообщество",
    menu: "Открыть меню",
    hero: {
      badge: "Mira Growth Hack",
      titleBefore: "Построй свою",
      accent: "AI-powered",
      titleAfter: "growth-машину за 10 дней",
      description:
        "Привлекай пользователей в Mira через контент, AI-агентов, мемы, лендинги, ботов, инфлюенсеров или любые другие growth-механики.",
      meta: ["12–21 мая", "Казахстан", "до 4 человек"],
      target: "Growth target",
      targetSteps: [
        "Запусти гипотезу",
        "Получи уникальную ссылку",
        "Приведи реальных пользователей",
      ],
    },
    countdown: {
      label: "До старта хакатона",
      date: "12 мая, 00:00",
      days: "дней",
      hours: "часов",
      minutes: "мин",
      seconds: "сек",
    },
    about: {
      eyebrow: "Что это?",
      title: "Mira Growth Hack",
      lead: "Mira Growth Hack — это соревнование, где участники привлекают пользователей в Mira и тестируют свои growth-гипотезы на практике.",
      text: "Можно запускать контент, делать мемы, вести рассылки, собирать лендинги, подключать Telegram-чаты, работать с инфлюенсерами, писать ботов или придумывать что-то совсем нестандартное.",
      highlight: "Главное — привести реальных пользователей!",
      tags: [
        "контент",
        "AI-агенты",
        "мемы",
        "лендинги",
        "боты",
        "инфлюенсеры",
        "Telegram-чаты",
        "SEO",
      ],
    },
    benefits: {
      eyebrow: "Призы и опыт",
      title: "Что ты получишь?",
      items: [
        [
          "Возможность попасть в команду Mira",
          "Сильные участники смогут показать себя перед международной командой продукта.",
        ],
        [
          "Шанс выиграть $$$",
          "Лучшие участники и команды получат денежные призы по итогам challenge.",
        ],
        [
          "1 месяц Mira Pro",
          "Доступ к Claude Sonnet, GPT-5, генерации видео и продвинутым автоматизациям.",
        ],
        [
          "Практический опыт в growth marketing",
          "Проверишь реальные каналы привлечения: от Telegram и Reels до ботов и SEO.",
        ],
        [
          "Кейс в портфолио и сертификат",
          "У тебя будет понятный результат: гипотеза, кампания, канал и место в leaderboard.",
        ],
      ].map(([title, description]) => ({ title, description })),
    },
    tracks: {
      eyebrow: "Треки",
      title: "Выбери свой growth-угол атаки",
      description:
        "На desktop карточки раскрываются при наведении или фокусе. На телефоне — по нажатию.",
      mechanic: "Механика",
      close: "Нажми еще раз, чтобы закрыть",
      sr: "Показать описание трека",
      items: mapTracks("ru"),
    },
    steps: {
      eyebrow: "Этапы",
      title: "4 шага до своей growth-кампании",
      leaderboard: "Твой результат виден сразу",
      leaderboardLabel: "Leaderboard preview",
      leaderboardHint:
        "Каждая регистрация по твоей ссылке увеличивает позицию в leaderboard.",
      rows: ["Team Viral", "Mira Makers", "SEO Sprint"],
      items: [
        [
          "Регистрируешься",
          "Заполняешь форму и выбираешь формат участия: индивидуально или в команде до 4 человек.",
        ],
        [
          "Получаешь Mira Pro и свою ссылку",
          "После старта challenge ты получаешь доступ к Mira Pro и уникальную ссылку для подсчета пользователей.",
        ],
        [
          "Запускаешь growth-механику",
          "Выбираешь любой подход: контент, AI-агенты, Telegram, Reels, лендинги, боты, инфлюенсеры или SEO.",
        ],
        [
          "Следишь за leaderboard",
          "Каждая регистрация по твоей ссылке засчитывается в результат. Чем больше пользователей, тем выше позиция.",
        ],
      ].map(([title, description]) => ({ title, description })),
    },
    mira: {
      eyebrow: "Что такое Mira?",
      title:
        "Главный AI-агент Telegram, который не просто отвечает, а действует.",
      description:
        "Mira помогает превращать переписки, идеи и задачи в конкретные действия прямо внутри Telegram.",
      features: [
        [
          "Действует, а не просто отвечает",
          "Mira помогает доводить задачи до результата, а не оставляет тебя с очередным текстовым ответом.",
        ],
        [
          "Интегрируется с сервисами",
          "Google Calendar, Notion, Linear, GitHub и другие инструменты можно подключать к рабочему процессу.",
        ],
        [
          "Помогает с задачами и планированием",
          "Можно ставить задачи, структурировать планы и управлять рабочими процессами прямо в Telegram.",
        ],
        [
          "Пишет и планирует контент",
          "Mira помогает с идеями, текстами, сценариями, постами, креативами и автоматизацией публикаций.",
        ],
      ].map(([title, description]) => ({ title, description })),
    },
    timeline: {
      eyebrow: "Таймлайн",
      title: "10 дней на запуск и проверку гипотезы",
      items: [
        ["До 12 мая", "Регистрация", "Регистрация участников и команд."],
        [
          "12 мая",
          "Старт",
          "Участники получают доступ к Mira Pro, свои ссылки и начинают запускать growth-механики.",
        ],
        [
          "12–21 мая",
          "Challenge",
          "Команды тестируют идеи, привлекают пользователей и следят за результатами в leaderboard.",
        ],
        [
          "После 21 мая",
          "Итоги",
          "Подведение итогов и объявление победителей произойдет в течение 2 недель после Mira Growth Hack.",
        ],
      ].map(([date, title, description]) => ({ date, title, description })),
    },
    faq: {
      eyebrow: "FAQ",
      title: "Частые вопросы",
      items: [
        [
          "Нужно ли уметь кодить?",
          "Нет. Можно участвовать через контент, Telegram, мемы, рассылки, Reels, комьюнити или любые другие growth-подходы. Кодинг может помочь, но не обязателен.",
        ],
        [
          "Можно участвовать одному?",
          "Да. Можно участвовать индивидуально или собрать команду до 4 человек.",
        ],
        [
          "Кто может участвовать?",
          "Участники из Казахстана: студенты, молодые специалисты, маркетологи, креаторы, product managers, founders, Telegram-админы и AI-энтузиасты.",
        ],
        [
          "Что считается результатом?",
          "Основной результат — количество пользователей, которые зарегистрировались по твоей уникальной ссылке.",
        ],
        [
          "Что такое Mira Pro?",
          "Mira Pro — расширенный доступ к возможностям Mira: продвинутые AI-модели, генерация изображений и видео, автоматизации и приоритетный доступ.",
        ],
        [
          "Какие методы можно использовать?",
          "Можно использовать контент, AI-агенты, Telegram-чаты, Reels, TikTok, лендинги, ботов, инфлюенсеров, SEO и другие легальные способы привлечения пользователей.",
        ],
      ].map(([question, answer]) => ({ question, answer })),
    },
    finalCta: {
      eyebrow: "Финальный CTA",
      title: "Готов построить свою growth-машину?",
      description:
        "Запускай кампанию, приводи пользователей и покажи себя команде Mira.",
    },
    footer: {
      description:
        "Mira Growth Hack — это 10-дневный AI-powered growth challenge для участников из Казахстана. С 12 по 21 мая участники привлекают пользователей в Mira через контент, мемы, лендинги, Telegram-чаты, ботов, инфлюенсеров, SEO и другие growth-механики.",
      reachOut: "связаться с нами",
      rights: "All rights reserved.",
      poweredBy: "Powered by",
    },
  },
  en: {
    nav: ["About", "Prizes", "Tracks", "Steps", "Mira", "Timeline", "FAQ"],
    cta: "Register",
    community: "Join community",
    menu: "Open menu",
    hero: {
      badge: "Mira Growth Hack",
      titleBefore: "Build your",
      accent: "AI-powered",
      titleAfter: "growth machine in 10 days",
      description:
        "Bring users to Mira through content, AI agents, memes, landing pages, bots, influencers, or any other growth mechanics.",
      meta: ["May 12–21", "Kazakhstan", "up to 4 people"],
      target: "Growth target",
      targetSteps: [
        "Launch a hypothesis",
        "Get your unique link",
        "Bring real users",
      ],
    },
    countdown: {
      label: "Hackathon starts in",
      date: "May 12, 00:00",
      days: "days",
      hours: "hours",
      minutes: "min",
      seconds: "sec",
    },
    about: {
      eyebrow: "About",
      title: "Mira Growth Hack",
      lead: "Mira Growth Hack is a competition where participants bring users to Mira and test growth hypotheses in practice.",
      text: "You can launch content, make memes, run newsletters, build landing pages, connect Telegram chats, work with influencers, write bots, or come up with something completely unconventional.",
      highlight: "The main goal is to bring real users!",
      tags: [
        "content",
        "AI agents",
        "memes",
        "landing pages",
        "bots",
        "influencers",
        "Telegram chats",
        "SEO",
      ],
    },
    benefits: {
      eyebrow: "Prizes and experience",
      title: "What you get",
      items: [
        [
          "A shot at joining Mira",
          "Strong participants can show their skills to an international product team.",
        ],
        [
          "A chance to win $$$",
          "Top participants and teams receive cash prizes after the challenge.",
        ],
        [
          "1 month of Mira Pro",
          "Access Claude Sonnet, GPT-5, video generation, and advanced automations.",
        ],
        [
          "Real growth marketing practice",
          "Test acquisition channels from Telegram and Reels to bots and SEO.",
        ],
        [
          "Portfolio case and certificate",
          "You will have a clear result: hypothesis, campaign, channel, users, and leaderboard rank.",
        ],
      ].map(([title, description]) => ({ title, description })),
    },
    tracks: {
      eyebrow: "Tracks",
      title: "Choose your growth angle",
      description:
        "Cards flip on hover or focus on desktop. On mobile, tap to reveal details.",
      mechanic: "Mechanic",
      close: "Tap again to close",
      sr: "Show track description",
      items: mapTracks("en"),
    },
    steps: {
      eyebrow: "Steps",
      title: "4 steps to launch your growth campaign",
      leaderboard: "Your result is visible instantly",
      leaderboardLabel: "Leaderboard preview",
      leaderboardHint:
        "Every registration through your link improves your leaderboard position.",
      rows: ["Team Viral", "Mira Makers", "SEO Sprint"],
      items: [
        [
          "Register",
          "Fill out the form and choose your format: solo or a team of up to 4 people.",
        ],
        [
          "Get Mira Pro and your link",
          "After the challenge starts, you receive Mira Pro access and a unique tracking link.",
        ],
        [
          "Launch a growth mechanic",
          "Choose content, AI agents, Telegram, Reels, landing pages, bots, influencers, SEO, or your own idea.",
        ],
        [
          "Watch the leaderboard",
          "Every signup through your link counts. The more users you bring, the higher you climb.",
        ],
      ].map(([title, description]) => ({ title, description })),
    },
    mira: {
      eyebrow: "What is Mira?",
      title: "The leading Telegram AI agent that acts, not just answers.",
      description:
        "Mira turns chats, ideas, and tasks into concrete actions directly inside Telegram.",
      features: [
        [
          "Acts, not just answers",
          "Mira helps you move tasks to outcomes instead of leaving you with another text response.",
        ],
        [
          "Connects to services",
          "Google Calendar, Notion, Linear, GitHub, and other tools can become part of the workflow.",
        ],
        [
          "Helps with tasks and planning",
          "Create tasks, structure plans, and manage workflows directly in Telegram.",
        ],
        [
          "Writes and schedules content",
          "Mira helps with ideas, texts, scripts, posts, creatives, and publishing automation.",
        ],
      ].map(([title, description]) => ({ title, description })),
    },
    timeline: {
      eyebrow: "Timeline",
      title: "10 days to launch and validate",
      items: [
        [
          "Before May 12",
          "Registration",
          "Registration for participants and teams.",
        ],
        [
          "May 12",
          "Start",
          "Participants receive Mira Pro access, their links, and start launching growth mechanics.",
        ],
        [
          "May 12–21",
          "Challenge",
          "Teams test ideas, bring users, and follow the leaderboard.",
        ],
        [
          "After May 21",
          "Results",
          "Winners will be announced within 2 weeks after Mira Growth Hack.",
        ],
      ].map(([date, title, description]) => ({ date, title, description })),
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions",
      items: [
        [
          "Do I need to code?",
          "No. You can participate through content, Telegram, memes, newsletters, Reels, community, or any other growth approach. Coding can help, but is not required.",
        ],
        [
          "Can I participate solo?",
          "Yes. You can join individually or build a team of up to 4 people.",
        ],
        [
          "Who can participate?",
          "Participants from Kazakhstan: students, young professionals, marketers, creators, product managers, founders, Telegram admins, and AI enthusiasts.",
        ],
        [
          "What counts as the result?",
          "The main result is the number of users who register through your unique link.",
        ],
        [
          "What is Mira Pro?",
          "Mira Pro unlocks advanced AI models, image and video generation, automations, and priority access.",
        ],
        [
          "Which methods are allowed?",
          "Content, AI agents, Telegram chats, Reels, TikTok, landing pages, bots, influencers, SEO, and other legal user acquisition methods are allowed.",
        ],
      ].map(([question, answer]) => ({ question, answer })),
    },
    finalCta: {
      eyebrow: "Final CTA",
      title: "Ready to build your growth machine?",
      description:
        "Launch a campaign, bring users, and show what you can do to the Mira team.",
    },
    footer: {
      description:
        "Mira Growth Hack is a 10-day AI-powered growth challenge for participants from Kazakhstan. From May 12 to 21, participants bring users to Mira through content, memes, landing pages, Telegram chats, bots, influencers, SEO, and other growth mechanics.",
      reachOut: "reach out to us",
      rights: "All rights reserved.",
      poweredBy: "Powered by",
    },
  },
  kk: {
    nav: [
      "Бұл не?",
      "Жүлделер",
      "Тректер",
      "Қадамдар",
      "Mira",
      "Таймлайн",
      "FAQ",
    ],
    cta: "Тіркелу",
    community: "Комьюнитиге кіру",
    menu: "Мәзірді ашу",
    hero: {
      badge: "Mira Growth Hack",
      titleBefore: "10 күнде өз",
      accent: "AI-powered",
      titleAfter: "growth-машинаңды құр",
      description:
        "Mira-ға қолданушыларды контент, AI-агенттер, мемдер, лендингтер, боттар, инфлюенсерлер немесе басқа growth-механикалар арқылы әкел.",
      meta: ["12–21 мамыр", "Қазақстан", "4 адамға дейін"],
      target: "Growth target",
      targetSteps: [
        "Гипотезаны іске қос",
        "Бірегей сілтеме ал",
        "Нақты қолданушылар әкел",
      ],
    },
    countdown: {
      label: "Хакатон басталуына",
      date: "12 мамыр, 00:00",
      days: "күн",
      hours: "сағ",
      minutes: "мин",
      seconds: "сек",
    },
    about: {
      eyebrow: "Бұл не?",
      title: "Mira Growth Hack",
      lead: "Mira Growth Hack — қатысушылар Mira-ға қолданушылар тартып, growth-гипотезаларын практикада тексеретін жарыс.",
      text: "Контент іске қосуға, мем жасауға, рассылкалар жүргізуге, лендингтер жинауға, Telegram-чаттарды қосуға, инфлюенсерлермен жұмыс істеуге, бот жазуға немесе мүлдем стандарттан тыс нәрсе ойлап табуға болады.",
      highlight: "Бастысы — нақты қолданушылар әкелу!",
      tags: [
        "контент",
        "AI-агенттер",
        "мемдер",
        "лендингтер",
        "боттар",
        "инфлюенсерлер",
        "Telegram-чаттар",
        "SEO",
      ],
    },
    benefits: {
      eyebrow: "Жүлде және тәжірибе",
      title: "Не аласың?",
      items: [
        [
          "Mira командасына кіру мүмкіндігі",
          "Мықты қатысушылар халықаралық өнім командасына өзін көрсете алады.",
        ],
        [
          "$$$ ұтып алу мүмкіндігі",
          "Үздік қатысушылар мен командалар challenge қорытындысы бойынша ақшалай жүлде алады.",
        ],
        [
          "1 ай Mira Pro",
          "Claude Sonnet, GPT-5, видео генерация және кеңейтілген автоматизацияларға қол жеткізесің.",
        ],
        [
          "Growth marketing тәжірибесі",
          "Telegram мен Reels-тен бастап боттар мен SEO-ға дейін нақты арналарды тексересің.",
        ],
        [
          "Портфолио кейсі және сертификат",
          "Нәтижең нақты болады: гипотеза, кампания, арна, қолданушы саны және leaderboard орны.",
        ],
      ].map(([title, description]) => ({ title, description })),
    },
    tracks: {
      eyebrow: "Тректер",
      title: "Өз growth бағытыңды таңда",
      description:
        "Desktop-та карточка hover/focus арқылы ашылады. Телефонда — tap арқылы.",
      mechanic: "Механика",
      close: "Жабу үшін қайта бас",
      sr: "Трек сипаттамасын көрсету",
      items: mapTracks("kk"),
    },
    steps: {
      eyebrow: "Қадамдар",
      title: "Growth-кампанияға дейін 4 қадам",
      leaderboard: "Нәтижең бірден көрінеді",
      leaderboardLabel: "Leaderboard preview",
      leaderboardHint:
        "Сілтемең арқылы әр тіркелу leaderboard позицияңды өсіреді.",
      rows: ["Team Viral", "Mira Makers", "SEO Sprint"],
      items: [
        [
          "Тіркелесің",
          "Форманы толтырып, қатысу форматын таңдайсың: жеке немесе 4 адамға дейін команда.",
        ],
        [
          "Mira Pro және сілтеме аласың",
          "Challenge басталған соң Mira Pro қолжетімділігі мен қолданушылар саналатын бірегей сілтеме беріледі.",
        ],
        [
          "Growth-механиканы іске қосасың",
          "Контент, AI-агенттер, Telegram, Reels, лендингтер, боттар, инфлюенсерлер, SEO немесе өз идеяңды таңда.",
        ],
        [
          "Leaderboard-ты бақылайсың",
          "Сілтемең арқылы әр тіркелу нәтижеңе қосылады. Қолданушы көп болса, позиция жоғары болады.",
        ],
      ].map(([title, description]) => ({ title, description })),
    },
    mira: {
      eyebrow: "Mira деген не?",
      title:
        "Telegram ішіндегі жауап беріп қана қоймай, әрекет ететін AI-агент.",
      description:
        "Mira хат алмасуды, идеяларды және тапсырмаларды Telegram ішінде нақты әрекетке айналдырады.",
      features: [
        [
          "Жауап бермейді, әрекет етеді",
          "Mira тапсырманы нәтиже деңгейіне жеткізуге көмектеседі.",
        ],
        [
          "Сервистермен интеграцияланады",
          "Google Calendar, Notion, Linear, GitHub және басқа құралдарды жұмыс процесіне қосуға болады.",
        ],
        [
          "Тапсырма және жоспарлауға көмектеседі",
          "Тапсырма қоюға, жоспар құруға және workflow басқаруға болады.",
        ],
        [
          "Контент жазады және жоспарлайды",
          "Mira идея, мәтін, сценарий, пост, креатив және жариялау автоматизациясына көмектеседі.",
        ],
      ].map(([title, description]) => ({ title, description })),
    },
    timeline: {
      eyebrow: "Таймлайн",
      title: "Гипотезаны іске қосып тексеруге 10 күн",
      items: [
        ["12 мамырға дейін", "Тіркелу", "Қатысушылар мен командаларды тіркеу."],
        [
          "12 мамыр",
          "Старт",
          "Қатысушылар Mira Pro, өз сілтемелерін алып, growth-механикаларын іске қосады.",
        ],
        [
          "12–21 мамыр",
          "Challenge",
          "Командалар идея тексеріп, қолданушы әкеліп, leaderboard бақылайды.",
        ],
        [
          "21 мамырдан кейін",
          "Қорытынды",
          "Жеңімпаздар Mira Growth Hack аяқталғаннан кейін 2 апта ішінде жарияланады.",
        ],
      ].map(([date, title, description]) => ({ date, title, description })),
    },
    faq: {
      eyebrow: "FAQ",
      title: "Жиі сұрақтар",
      items: [
        [
          "Код жаза білу керек пе?",
          "Жоқ. Контент, Telegram, мем, рассылка, Reels, комьюнити немесе басқа growth тәсілдері арқылы қатысуға болады. Код көмектесуі мүмкін, бірақ міндетті емес.",
        ],
        [
          "Жалғыз қатысуға бола ма?",
          "Иә. Жеке немесе 4 адамға дейін командамен қатысуға болады.",
        ],
        [
          "Кім қатыса алады?",
          "Қазақстандағы студенттер, жас мамандар, маркетологтар, креаторлар, product managers, founders, Telegram-админдер және AI-энтузиастар.",
        ],
        [
          "Нәтиже қалай саналады?",
          "Негізгі нәтиже — сенің бірегей сілтемең арқылы тіркелген қолданушылар саны.",
        ],
        [
          "Mira Pro деген не?",
          "Mira Pro — кеңейтілген AI-модельдер, сурет және видео генерация, автоматизация және приоритетті қолжетімділік.",
        ],
        [
          "Қандай әдістерді қолдануға болады?",
          "Контент, AI-агенттер, Telegram-чаттар, Reels, TikTok, лендингтер, боттар, инфлюенсерлер, SEO және басқа заңды user acquisition әдістерін қолдануға болады.",
        ],
      ].map(([question, answer]) => ({ question, answer })),
    },
    finalCta: {
      eyebrow: "Финал CTA",
      title: "Growth-машинаңды құруға дайынсың ба?",
      description:
        "Кампанияны іске қос, қолданушы әкел және Mira командасына өзіңді көрсет.",
    },
    footer: {
      description:
        "Mira Growth Hack — Қазақстан қатысушыларына арналған 10 күндік AI-powered growth challenge. 12-21 мамыр аралығында қатысушылар Mira-ға қолданушыларды контент, мемдер, лендингтер, Telegram-чаттар, боттар, инфлюенсерлер, SEO және басқа growth-механикалар арқылы тартады.",
      reachOut: "бізбен байланысу",
      rights: "All rights reserved.",
      poweredBy: "Powered by",
    },
  },
};

export const navHrefs = [
  "#about",
  "#benefits",
  "#tracks",
  "#steps",
  "#mira",
  "#timeline",
  "#faq",
];

export type LandingContent = (typeof landingContent)[Language];
