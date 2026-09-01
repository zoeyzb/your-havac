'use client'

import Image from 'next/image'
import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ServicesPreview from './ServicesPreview'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import { Thermometer, Wind, Wrench, Shield, Clock, Award } from 'lucide-react'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

const experiences = [
  { icon: Thermometer, label: 'Heating Systems' },
  { icon: Wind, label: 'Air Conditioning' },
  { icon: Wrench, label: 'Repairs & Maintenance' },
  { icon: Shield, label: 'System Protection' },
  { icon: Clock, label: '24/7 Emergency' },
  { icon: Award, label: 'Certified Experts' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80&fit=crop', alt: 'HVAC installation' },
  { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&fit=crop', alt: 'Climate control system' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80&fit=crop', alt: 'Professional HVAC service' },
  { src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&fit=crop', alt: 'Modern heating system' },
]

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Experiences Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete heating, ventilation, and air conditioning solutions for your home and business.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {experiences.map((exp, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <exp.icon className="w-8 h-8 text-primary-700" />
                </div>
                <p className="text-sm font-medium text-gray-700">{exp.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <ErrorBoundary>
        <ServicesPreview />
      </ErrorBoundary>

      {/* Photo Gallery */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional installations and service across residential and commercial properties.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <h3 className="font-display text-2xl font-bold text-white mb-4">Summit Climate Systems</h3>
              <p className="text-gray-400 mb-4">
                Delivering reliable heating and cooling solutions with certified expertise and 24/7 emergency service.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-accent-400 transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-accent-400 transition-colors">About Us</a></li>
                <li><a href="/testimonials" className="hover:text-accent-400 transition-colors">Testimonials</a></li>
                <li><a href="/contact" className="hover:text-accent-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/services" className="hover:text-accent-400 transition-colors">All Services</a></li>
                <li><a href="/service-areas" className="hover:text-accent-400 transition-colors">Service Areas</a></li>
                <li><a href="/services" className="hover:text-accent-400 transition-colors">AC Installation</a></li>
                <li><a href="/services" className="hover:text-accent-400 transition-colors">Heating Repair</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>850 Climate Control Road</li>
                <li>Atlanta, GA 30301</li>
                <li>service@summitclimate.com</li>
                <li>(555) 345-6718</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Summit Climate Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
