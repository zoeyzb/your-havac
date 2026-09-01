'use client'

import Image from 'next/image'
import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'Total Comfort Solutions'
  const subtitle = (homepageContent as any)?.heroSubtitle || ''
  const description = (homepageContent as any)?.heroDescription?.processed || ''

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1920&q=80&fit=crop"
        alt="HVAC systems and climate control"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">{subtitle}</p>}
        {description && (
          <div className="text-lg text-gray-300 max-w-2xl mx-auto mb-10" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full hover:from-accent-400 hover:to-accent-500 transition-all duration-200 font-bold text-lg shadow-lg shadow-accent-500/30"
          >
            Schedule Service
          </a>
          <a
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-200 font-bold text-lg"
          >
            Our Services
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  )
}
