import { Inter, Poppins } from "next/font/google";
import { Metadata } from "next";

import "./globals.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-inter",
});

const poppins = Poppins({
    weight: ["600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: {
        default: "PsiloUp",
        template: "%s | PsiloUp",
    },
    description:
        "PsiloUp — Suplementos premium inspirados em creators e líderes que precisam de foco limpo, energia inteligente e metabolismo equilibrado todos os dias.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className="dark">
            <body className={`${inter.variable} ${poppins.variable} antialiased`}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
