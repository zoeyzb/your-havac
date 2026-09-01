import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params
  const routePath = resolvedParams.path.join('/')
  const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL

  if (!drupalBaseUrl) {
    return NextResponse.json({ error: 'Drupal base URL not configured' }, { status: 500 })
  }

  const drupalUrl = `${drupalBaseUrl}/sites/${routePath}`

  try {
    const response = await fetch(drupalUrl)

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch asset' }, { status: response.status })
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const body = await response.arrayBuffer()

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error proxying Drupal asset:', error)
    return NextResponse.json({ error: 'Failed to proxy asset' }, { status: 500 })
  }
}
