import { type Metadata } from 'next'

import { RootLayout } from '@/components/RootLayout'

import '@/styles/global.css'

export const metadata: Metadata = {
  title: {
    template: '%s · purple street',
    default: 'purple street',
  },
  description:
    'Urbanismo feminista, procesos participativos y herramientas para crear espacios más inclusivos, amables y cuidadores.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full bg-[#f4f1e8] text-base antialiased">
      <body className="min-h-full">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
