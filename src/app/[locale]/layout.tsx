import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import "./globals.css";

// import { Directions, Languages } from "@/constants/enums";
import { Metadata } from "next";
import { ToasterProvider } from "@/providers/ToastProvider/ToasterProvider";
import { ProvidersTheme } from "@/providers/ThemeProvider";

import localfont from "next/font/local";
import ReduxProvider from "@/providers/ReduxProvider";

const myFont = localfont({ src: "../../fonts/Cairo-Medium.ttf" });


export const metadata: Metadata = {
  // metadataBase: new URL("https://markup.vip"),
  title: {
    default: "Qasr Alsutan",
    template: "%s | Qasr Alsutan",
  },
  icons: {
    icon: [
      { url: "/icons/qasr-alsutan-logo.png", sizes: "32x32" },
      { url: "/icons/qasr-alsutan-logo.png", sizes: "16x16" },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  // Ensure that the incoming `locale` is valid

  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const currentLocale = locale ?? "ar"; // default to Arabic

  return (
    <html
      lang={currentLocale}
      dir={currentLocale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`bg-[#FBFBFB] dark:bg-slate-900 ${myFont.className}`}>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <ToasterProvider />
            <ProvidersTheme>
              {/* <ReduxProvider> */}
              {children}
              {/* </ReduxProvider> */}
            </ProvidersTheme>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
