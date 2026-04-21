import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "HR CRM",
  description: "AI-driven HR management system",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased font-roboto`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
