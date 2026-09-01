'use client'

import { useQuery, gql as apolloGql } from '@apollo/client'
import { GET_SERVICES } from '@/lib/queries'
import ServiceCard from './ServiceCard'
import Link from 'next/link'

const SERVICES_QUERY = apolloGql(GET_SERVICES)

export default function ServicesPreview() {
  const { data, loading } = useQuery(SERVICES_QUERY, {
    variables: { first: 3 },
  })

  const services = data?.nodeServices?.nodes || []

  if (loading) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">Loading services...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (services.length === 0) return null

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From routine maintenance to emergency repairs, we keep your systems running at peak performance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item: any) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full hover:from-primary-500 hover:to-primary-600 transition-all duration-200 font-bold shadow-md shadow-primary-500/20"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
