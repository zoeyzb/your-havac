'use client'

import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Get in Touch'
  const description = (homepageContent as any)?.ctaDescription?.processed || ''
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Contact Us'
  const secondaryLabel = (homepageContent as any)?.ctaSecondary || 'Learn More'

  return (
    <section className="relative bg-gradient-to-r from-primary-800 via-primary-900 to-primary-800 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        {description && (
          <div className="text-primary-200 mb-8 max-w-2xl mx-auto text-lg" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/contact" className="px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full hover:from-accent-400 hover:to-accent-500 transition-all duration-200 font-bold shadow-lg shadow-accent-500/30">
            {primaryLabel}
          </a>
          <a href="/about" className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-primary-900 transition-all duration-200 font-bold">
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
