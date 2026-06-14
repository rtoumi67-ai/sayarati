import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import "./globals.css";
import AppChrome from "./components/AppChrome";
import Footer from "./components/Footer";
import I18nProvider from "./i18n/I18nProvider";
import { getLanguageDir, LANGUAGE_COOKIE, normalizeAppLanguage } from "./i18n/shared";
import ThemeProvider from "./theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Sayarati | سيارتي",
  description:
    "Sayarati is a premium car-services platform: booking, maintenance, and everything your car needs — with a futuristic Garage OS experience.",
};

const themeInitScript = `
  (function () {
    try {
      var root = document.documentElement;
      var stored = window.localStorage.getItem("sayarati.theme");
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var resolved = stored === "light" || stored === "dark" ? stored : (prefersDark ? "dark" : "light");
      root.classList.toggle("dark", resolved === "dark");
      root.style.colorScheme = resolved;
    } catch (error) {
      // Ignore early theme bootstrap failures and continue with CSS defaults.
    }
  })();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = normalizeAppLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value) ?? "ar";
  const dir = getLanguageDir(lang);

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>
          <I18nProvider initialLanguage={lang}>
            <AppChrome />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
