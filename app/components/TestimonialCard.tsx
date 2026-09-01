import Link from 'next/link'
import { DrupalTestimonial } from '@/lib/types'
import ResponsiveImage from './ResponsiveImage'
import { Quote, Star } from 'lucide-react'

interface TestimonialCardProps {
  item: DrupalTestimonial
}

export default function TestimonialCard({ item }: TestimonialCardProps) {
  const rating = (item as any).rating

  return (
    <Link
      href={item.path || '#'}
      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary-600 to-primary-800">
        {(item as any).photo?.url ? (
          <ResponsiveImage
            src={(item as any).photo.url}
            alt={(item as any).photo.alt || item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            variations={(item as any).photo.variations}
            targetWidth={400}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Quote className="w-16 h-16 text-white/30" />
          </div>
        )}
      </div>

      <div className="p-6">
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: Math.min(Number(rating), 5) }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-accent-500 fill-accent-500" />
            ))}
          </div>
        )}

        {(item as any).clientName && (
          <p className="text-sm text-primary-700 font-medium mb-2">{(item as any).clientName}</p>
        )}

        <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
          {item.title}
        </h3>

        {(item as any).body?.processed && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 italic">
            &ldquo;{(item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 150)}&rdquo;
          </p>
        )}
      </div>
    </Link>
  )
}
