import { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "PsiloUp | Neuro Performance Natural",
  description:
    "PsiloUp — Suplementos premium inspirados em creators e líderes que precisam de foco limpo, energia inteligente e metabolismo equilibrado todos os dias.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="stylesheet" href="/css/psiloup.css" />
        <link rel="stylesheet" href="/css/psiloup-modern.css" />
        <link rel="stylesheet" href="/css/fontawesome-all.min.css" />
        <link rel="stylesheet" href="/css/psiloup-nextjs-fix.css" />
      </head>
      <body>
        {props.children}
      </body>
    </html>
  )
}
