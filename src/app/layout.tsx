import type { Metadata } from "next";
import { Unbounded, Golos_Text, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
});

const body = Golos_Text({
  variable: "--font-body",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Senior — барбершоп в Астане",
  description: "Senior — барбершоп на Мәңгілік Ел, 51/2. Онлайн-запись, услуги и цены.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink text-ivory font-body antialiased">{children}</body>
    </html>
  );
}
