import { getClient } from '@/lib/drupal-client'
import Header from '../components/Header'
import ErrorBoundary from '../components/ErrorBoundary'
import HomepageRenderer from '../components/HomepageRenderer'
import ResponsiveImage from '../components/ResponsiveImage'
import { Metadata } from 'next'

export const revalidate = 300
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params
  const path = `/${(resolvedParams.slug || []).join('/')}`
  try {
    const client = getClient()
    const page = await client.getEntryByPath(path)
    const title = (page as any)?.title || 'Page'
    return { title }
  } catch {
    return { title: 'Page' }
  }
}

function PageNotFound({ path }: { path: string }) {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-xl shadow-md p-12">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-2">We couldn&#39;t find any content at this path.</p>
        <p className="text-sm text-gray-500">Path: {path}</p>
      </div>
    </div>
  )
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const path = `/${(resolvedParams.slug || []).join('/')}`
  const client = getClient()

  try {
    const entity = await client.getEntryByPath(path) as any
    if (!entity) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <PageNotFound path={path} />
          </main>
        </div>
      )
    }

    if (entity.__typename === 'NodeHomepage') {
      return <HomepageRenderer homepageContent={entity} />
    }

    const title = entity.title || 'Untitled'
    const bodyHtml = entity?.body?.processed || ''
    const image = entity?.image

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <section className="relative bg-gradient-to-r from-primary-800 via-primary-900 to-primary-800 text-white py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h1>
          </div>
        </section>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <ErrorBoundary>
            <article className="bg-white rounded-xl shadow-md overflow-hidden">
              {image && (
                <ResponsiveImage
                  image={image}
                  alt={image.alt || title}
                  className="rounded-t-xl"
                  priority={true}
                />
              )}
              <div className="p-6 md:p-8">
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:font-display prose-a:text-primary-700" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              </div>
            </article>
          </ErrorBoundary>
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error loading page by path:', error)
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PageNotFound path={path} />
        </main>
      </div>
    )
  }
}
