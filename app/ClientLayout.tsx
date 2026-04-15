'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from '@/components/scroll-to-top'

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    // Routes where we don't want the public header/footer
    const isAdmin = pathname?.startsWith('/admin') ||
        pathname?.startsWith('/dashboard') ||
        pathname === '/login'

    return (
        <>
            <Toaster position="bottom-right" />
            <div className="relative">
                {!isAdmin && <div className="absolute top-0 left-0 right-0 z-50"><Header /></div>}
                {children}
            </div>
            {!isAdmin && <Footer />}
            {!isAdmin && <ScrollToTop />}
        </>
    )
}