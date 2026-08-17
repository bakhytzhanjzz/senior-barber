import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Senior — панель персонала",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-ink text-ivory">{children}</div>;
}
