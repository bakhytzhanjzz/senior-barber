export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    services: string;
    locations: string;
    contacts: string;
    book: string;
    switchLocale: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
  };
  ticker: { label: string; promo: string };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    durationUnit: string;
    priceFrom: string;
    cta: string;
  };
  locations: {
    eyebrow: string;
    title: string;
    subtitle: string;
    hoursLabel: string;
    whatsappLabel: string;
    callLabel: string;
    bookLabel: string;
    mapLabel: string;
    instagramLabel: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    tagline: string;
    rights: string;
    admin: string;
  };
  booking: {
    title: string;
    subtitle: string;
    steps: { service: string; time: string; contact: string };
    stepEyebrow: string;
    back: string;
    next: string;
    anyMaster: string;
    anyMasterNote: string;
    chooseDate: string;
    chooseTime: string;
    noSlots: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    commentLabel: string;
    commentPlaceholder: string;
    submit: string;
    submitting: string;
    summaryTitle: string;
    addressLabel: string;
    successTitle: string;
    successBody: string;
    successBack: string;
    errorTitle: string;
    errorBody: string;
    weekdaysShort: string[];
    months: string[];
    minutesShort: string;
    tenge: string;
    priceLabel: string;
  };
};

export const dictionaries = {
  ru: {
    meta: {
      title: "Abyroi Barbershop — барбершоп в Астане",
      description:
        "Abyroi Barbershop — барбершоп на ул. Жұмекен Нәжімеденов, 29. Онлайн-запись, запись по телефону и WhatsApp.",
    },
    nav: {
      services: "Услуги",
      locations: "Контакты",
      contacts: "Контакты",
      book: "Записаться",
      switchLocale: "ҚАЗ",
    },
    hero: {
      eyebrow: "Барбершоп Abyroi · ул. Жұмекен Нәжімеденов, 29",
      headline: "Мастерство,",
      headlineAccent: "достойное уважения.",
      sub: "Мужской барбершоп с классической школой и вниманием к деталям. Опытные барберы, стрижки от 4000 ₸ — запишитесь онлайн за минуту.",
      ctaPrimary: "Записаться онлайн",
      ctaSecondary: "Смотреть услуги",
      stat1Value: "10:00–20:00",
      stat1Label: "ежедневно, без выходных",
      stat2Value: "+7 702 507-51-61",
      stat2Label: "запись по телефону и WhatsApp",
    },
    ticker: { label: "Barbershop Abyroi", promo: "🎁 Воск и маска в подарок" },
    services: {
      eyebrow: "Прайс",
      title: "Услуги и цены",
      subtitle: "Актуальный прайс. Точное время мастер подтвердит при записи.",
      durationUnit: "мин",
      priceFrom: "от",
      cta: "Записаться на услугу",
    },
    locations: {
      eyebrow: "Адрес",
      title: "Приходите в Abyroi",
      subtitle: "Одна точка в Астане — записывайтесь онлайн, по телефону или в WhatsApp.",
      hoursLabel: "Часы работы",
      whatsappLabel: "Написать в WhatsApp",
      callLabel: "Позвонить",
      bookLabel: "Записаться онлайн",
      mapLabel: "Показать на 2ГИС",
      instagramLabel: "Instagram",
    },
    cta: {
      title: "Готовы к новой стрижке?",
      subtitle: "Выберите услугу и удобное время — это займёт меньше минуты.",
      button: "Записаться онлайн",
    },
    footer: {
      tagline: "Опытные барберы · стрижки от 4000 ₸",
      rights: "Все права защищены.",
      admin: "Вход для персонала",
    },
    booking: {
      title: "Онлайн-запись",
      subtitle: "Три шага — и вы в расписании мастера.",
      steps: {
        service: "Услуга",
        time: "Время",
        contact: "Контакты",
      },
      stepEyebrow: "Шаг",
      back: "Назад",
      next: "Далее",
      anyMaster: "Любой свободный мастер",
      anyMasterNote: "Запишем к мастеру, у которого раньше всего есть окно",
      chooseDate: "Выберите дату",
      chooseTime: "Выберите время",
      noSlots: "На эту дату свободных окон нет — попробуйте другой день",
      nameLabel: "Имя",
      namePlaceholder: "Как к вам обращаться",
      phoneLabel: "Телефон",
      phonePlaceholder: "+7 (___) ___-__-__",
      commentLabel: "Комментарий",
      commentPlaceholder: "Необязательно: пожелания к мастеру",
      submit: "Подтвердить запись",
      submitting: "Отправляем…",
      summaryTitle: "Ваша запись",
      addressLabel: "Адрес",
      successTitle: "Вы записаны",
      successBody: "Мастер будет ждать вас в выбранное время. Мы отправим напоминание за час до визита.",
      successBack: "На главную",
      errorTitle: "Не удалось отправить запись",
      errorBody: "Проверьте данные и попробуйте ещё раз, либо напишите нам в WhatsApp.",
      weekdaysShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      months: [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ],
      minutesShort: "мин",
      tenge: "₸",
      priceLabel: "Стоимость",
    },
  },
  kk: {
    meta: {
      title: "Abyroi Barbershop — Астанадағы барбершоп",
      description:
        "Abyroi Barbershop Жұмекен Нәжімеденов көшесі, 29 мекенжайында. Онлайн жазылу, телефон және WhatsApp арқылы жазылу.",
    },
    nav: {
      services: "Қызметтер",
      locations: "Байланыс",
      contacts: "Байланыс",
      book: "Жазылу",
      switchLocale: "RUS",
    },
    hero: {
      eyebrow: "Barbershop Abyroi · Жұмекен Нәжімеденов көшесі, 29",
      headline: "Абыройға",
      headlineAccent: "лайық қырқым.",
      sub: "Классикалық мектеп пен егжей-тегжейге көңіл бөлетін ерлер барбершобы. Тәжірибелі барберлер, 4000 ₸-ден бастап қызметтер — онлайн жазылу бір минут алады.",
      ctaPrimary: "Онлайн жазылу",
      ctaSecondary: "Қызметтерді көру",
      stat1Value: "10:00–20:00",
      stat1Label: "күн сайын, демалыссыз",
      stat2Value: "+7 702 507-51-61",
      stat2Label: "телефон және WhatsApp арқылы жазылу",
    },
    ticker: { label: "Barbershop Abyroi", promo: "🎁 Балауыз бен маска сыйлыққа" },
    services: {
      eyebrow: "Баға",
      title: "Қызметтер мен бағалар",
      subtitle: "Ағымдағы баға. Нақты уақытты шебер жазылу кезінде растайды.",
      durationUnit: "мин",
      priceFrom: "бастап",
      cta: "Осы қызметке жазылу",
    },
    locations: {
      eyebrow: "Мекенжай",
      title: "Abyroi-ге келіңіз",
      subtitle: "Астанадағы бір нүкте — онлайн, телефон немесе WhatsApp арқылы жазылыңыз.",
      hoursLabel: "Жұмыс уақыты",
      whatsappLabel: "WhatsApp-қа жазу",
      callLabel: "Қоңырау шалу",
      bookLabel: "Онлайн жазылу",
      mapLabel: "2ГИС-тен көру",
      instagramLabel: "Instagram",
    },
    cta: {
      title: "Жаңа шаш үлгісіне дайынсыз ба?",
      subtitle: "Қызмет пен ыңғайлы уақытты таңдаңыз — бір минуттан аз уақыт алады.",
      button: "Онлайн жазылу",
    },
    footer: {
      tagline: "Тәжірибелі барберлер · 4000 ₸-ден бастап",
      rights: "Барлық құқықтар қорғалған.",
      admin: "Қызметкерлер кіруі",
    },
    booking: {
      title: "Онлайн жазылу",
      subtitle: "Үш қадам — және сіз шебердің кестесіндесіз.",
      steps: {
        service: "Қызмет",
        time: "Уақыт",
        contact: "Байланыс",
      },
      stepEyebrow: "Қадам",
      back: "Артқа",
      next: "Келесі",
      anyMaster: "Кез келген бос шебер",
      anyMasterNote: "Ең ерте бос уақыты бар шеберге жазамыз",
      chooseDate: "Күнді таңдаңыз",
      chooseTime: "Уақытты таңдаңыз",
      noSlots: "Бұл күнге бос уақыт жоқ — басқа күнді таңдап көріңіз",
      nameLabel: "Аты",
      namePlaceholder: "Сізге қалай жүгінейік",
      phoneLabel: "Телефон",
      phonePlaceholder: "+7 (___) ___-__-__",
      commentLabel: "Пікір",
      commentPlaceholder: "Міндетті емес: шеберге тілектеріңіз",
      submit: "Жазылуды растау",
      submitting: "Жіберілуде…",
      summaryTitle: "Сіздің жазылуыңыз",
      addressLabel: "Мекенжай",
      successTitle: "Сіз жазылдыңыз",
      successBody: "Шебер сізді таңдалған уақытта күтеді. Келу алдында бір сағат бұрын еске саламыз.",
      successBack: "Басты бетке",
      errorTitle: "Жазылуды жіберу мүмкін болмады",
      errorBody: "Деректерді тексеріп, қайта көріңіз немесе бізге WhatsApp-қа жазыңыз.",
      weekdaysShort: ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"],
      months: [
        "қаңтар",
        "ақпан",
        "наурыз",
        "сәуір",
        "мамыр",
        "маусым",
        "шілде",
        "тамыз",
        "қыркүйек",
        "қазан",
        "қараша",
        "желтоқсан",
      ],
      minutesShort: "мин",
      tenge: "₸",
      priceLabel: "Құны",
    },
  },
} satisfies Record<"ru" | "kk", Dictionary>;
