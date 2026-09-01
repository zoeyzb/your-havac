'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, X, Thermometer } from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Service Areas', href: '/service-areas' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)

  useEffect(() => {
    const banner = document.querySelector('[data-demo-banner]')
    if (banner) {
      const updateHeight = () => setBannerHeight(banner.getBoundingClientRect().height)
      updateHeight()
      const observer = new MutationObserver(updateHeight)
      observer.observe(banner, { attributes: true, childList: true, subtree: true })
      window.addEventListener('resize', updateHeight)
      return () => {
        observer.disconnect()
        window.removeEventListener('resize', updateHeight)
      }
    } else {
      setBannerHeight(0)
    }
  }, [])

  const getActiveTab = () => {
    if (pathname === '/') return 'Home'
    for (const item of navigationItems) {
      if (item.href !== '/' && pathname.startsWith(item.href)) {
        return item.name
      }
    }
    return null
  }

  const activeTab = getActiveTab()

  return (
    <header
      className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky z-50"
      style={{ top: bannerHeight }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-gray-900 hidden sm:block">
              Summit Climate Systems
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeTab === item.name
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2 rounded-full hover:from-primary-500 hover:to-primary-600 transition-all duration-200 font-bold text-sm shadow-md shadow-primary-500/20"
            >
              Get a Quote
            </Link>

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'px-4 py-3 rounded-full text-sm font-medium transition-all duration-200',
                    activeTab === item.name
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-2 text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-3 rounded-full font-bold text-sm"
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
