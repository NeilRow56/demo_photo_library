import '@/app/globals.css'
import { Image } from 'lucide-react'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SidebarLinks from '@/components/SidebarLinks'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Nav />
      <main className="grid grid-rows-[auto_1fr] md:grid-cols-[12rem_auto] md:grid-rows-none">
        <aside className="md:my-6">
          <SidebarLinks
            links={[
              {
                // eslint-disable-next-line jsx-a11y/alt-text
                icon: <Image className="h-5 w-5" />,
                label: 'Photos',
                path: '/',
              },
            ]}
          />
        </aside>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  )
}
