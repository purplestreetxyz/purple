import { Footer } from '@/components/Footer'
import { GlassesCursor } from '@/components/GlassesCursor'
import { LanguageProvider } from '@/components/LanguageProvider'
import { SiteHeader } from '@/components/SiteHeader'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-full bg-paper text-ink">
        <GlassesCursor />
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  )
}
