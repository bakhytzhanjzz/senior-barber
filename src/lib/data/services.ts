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
    price: 3000,
  },
  {
    id: "hair-tint",
    category: "hair",
    name: { ru: "Тонировка волос", kk: "Шашты тондау" },
    durationMin: 40,
    price: 3500,
  },
  {
    id: "beard-trim",
    category: "beard",
    name: { ru: "Оформление бороды", kk: "Сақалды пішіндеу" },
    durationMin: 25,
    price: 3000,
  },
  {
    id: "royal-shave",
    category: "beard",
    name: { ru: "Королевское бритьё опасной бритвой", kk: "Қауіпсіз ұстарамен корольдік қырыну" },
    durationMin: 30,
    price: 4500,
  },
  {
    id: "mask",
    category: "extra",
    name: { ru: "Black Mask | Gold Mask", kk: "Black Mask | Gold Mask" },
    durationMin: 15,
    price: 1500,
  },
  {
    id: "combo",
    category: "combo",
    name: { ru: "Комбо Abyroi: стрижка + борода", kk: "Abyroi комбо: шаш алдыру + сақал" },
    durationMin: 70,
    price: 7500,
    note: {
      ru: "Стрижка, борода и в подарок: воск для укладки и маска",
      kk: "Шаш алдыру, сақал және сыйлыққа: сәндеу балауызы мен маска",
    },
    featured: true,
  },
];
