import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hemant Agrawal | AI/ML Student & QA Automation Engineer",
  description:
    "Hemant Agrawal is a Computer Science Engineering student specializing in AI & Machine Learning with practical experience in QA Automation, REST API testing, Java, TestNG and Rest Assured.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Hemant Agrawal | AI/ML Student & QA Automation Engineer",
    description:
      "Hemant Agrawal is a Computer Science Engineering student specializing in AI & Machine Learning with practical experience in QA Automation, REST API testing, Java, TestNG and Rest Assured.",
    type: "website",
    locale: "en_IN",
  },
};

const themeInit = `
try {
  var t = localStorage.getItem('theme');
  if (t !== 'light' && t !== 'dark') t = 'dark';
  document.documentElement.setAttribute('data-theme', t);
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
