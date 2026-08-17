export type Location = {
  id: string;
  slug: string;
  district: string;
  address: string;
  mapQuery: string;
  hours: { ru: string; kk: string };
  openMin: number;
  closeMin: number;
  /** E.164, no "+" — used for both the WhatsApp link and tel: link. */
  whatsapp: string;
};

export const DEFAULT_OPEN_MIN = 10 * 60;
export const DEFAULT_CLOSE_MIN = 20 * 60;

export const locations: Location[] = [
  {
    id: "mangilik-el",
    slug: "mangilik-el",
    district: "Астана",
    address: "Мәңгілік Ел, 51/2",
    mapQuery: "Мангилик Ел 51/2, Астана",
    hours: { ru: "10:00 – 20:00, ежедневно", kk: "10:00 – 20:00, күн сайын" },
    openMin: DEFAULT_OPEN_MIN,
    closeMin: DEFAULT_CLOSE_MIN,
    whatsapp: "77759090996",
  },
];
