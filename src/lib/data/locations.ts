export type Location = {
  id: string;
  slug: string;
  district: string;
  address: string;
  mapUrl: string;
  hours: { ru: string; kk: string };
  openMin: number;
  closeMin: number;
  /** E.164, no "+" — used for both the WhatsApp link and tel: link. */
  whatsapp: string;
  instagram: string;
};

export const DEFAULT_OPEN_MIN = 10 * 60;
export const DEFAULT_CLOSE_MIN = 20 * 60;

export const locations: Location[] = [
  {
    id: "zhumeken-nazhimedenov",
    slug: "zhumeken-nazhimedenov",
    district: "Астана",
    address: "ул. Жұмекен Нәжімеденов, 29",
    mapUrl: "https://2gis.kz/astana/geo/70000001113930754",
    hours: { ru: "10:00 – 20:00, ежедневно", kk: "10:00 – 20:00, күн сайын" },
    openMin: DEFAULT_OPEN_MIN,
    closeMin: DEFAULT_CLOSE_MIN,
    whatsapp: "77025075161",
    instagram: "https://www.instagram.com/abyroi_barbershop_01",
  },
];
