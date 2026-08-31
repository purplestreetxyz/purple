import { Footer } from '@/components/Footer'
import { GlassesCursor } from '@/components/GlassesCursor'
import { SiteHeader } from '@/components/SiteHeader'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-paper text-ink">
      <GlassesCursor />
      <div className="site-shell">
        <SiteHeader />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
