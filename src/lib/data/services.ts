export type Service = {
  id: string;
  category: "hair" | "beard" | "combo" | "kids" | "extra";
  name: { ru: string; kk: string };
  durationMin: number;
  price: number;
  /** Short breakdown shown under the name — used for the combo package. */
  note?: { ru: string; kk: string };
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "haircut",
    category: "hair",
    name: { ru: "Мужская стрижка", kk: "Ерлер шаш алдыру" },
    durationMin: 40,
    price: 4000,
  },
  {
    id: "kids-haircut",
    category: "kids",
    name: { ru: "Детская стрижка", kk: "Балалар шаш алдыруы" },
    durationMin: 30,
    price: 2500,
  },
  {
    id: "hair-tint",
    category: "hair",
    name: { ru: "Тонировка волос", kk: "Шашты тондау" },
    durationMin: 40,
    price: 3000,
  },
  {
    id: "beard-trim",
    category: "beard",
    name: { ru: "Оформление бороды", kk: "Сақалды пішіндеу" },
    durationMin: 25,
    price: 2500,
  },
  {
    id: "beard-tint",
    category: "beard",
    name: { ru: "Тонировка бороды", kk: "Сақалды тондау" },
    durationMin: 20,
    price: 2500,
  },
  {
    id: "mask",
    category: "extra",
    name: { ru: "Black Mask | Gold Mask", kk: "Black Mask | Gold Mask" },
    durationMin: 15,
    price: 1000,
  },
  {
    id: "combo",
    category: "combo",
    name: { ru: "Комбо стрижка от Senior", kk: "Senior-нан комбо стрижка" },
    durationMin: 75,
    price: 7000,
    note: {
      ru: "Стрижка, борода, Black mask, воск, зажигалка и + 1 мин. массаж",
      kk: "Шаш алдыру, сақал, Black mask, балауыз, оталдырғыш және + 1 мин. массаж",
    },
    featured: true,
  },
];
