import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { Hero } from "@/components/site/Hero";
import { Ticker } from "@/components/site/Ticker";
import { ServicesMenu } from "@/components/site/ServicesMenu";
import { LocationsGrid } from "@/components/site/LocationsGrid";
import { CTASection } from "@/components/site/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Ticker label={dict.ticker.label} />
      <ServicesMenu locale={locale} dict={dict} />
      <LocationsGrid locale={locale} dict={dict} />
      <CTASection locale={locale} dict={dict} />
    </>
  );
}
