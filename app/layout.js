import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata = {
    title: "HR CRM",
    description: "AI-driven HR management system",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${roboto.variable} ${inter.variable}`}>
        <body>{children}</body>
        </html>
    );
}