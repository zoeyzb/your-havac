import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { isDemoMode, handleMockQuery } from './demo-mode'

function getServerBaseUrl(): string {
  // Prefer an explicit site URL if provided (e.g., https://example.com).
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (explicitSiteUrl) {
    return explicitSiteUrl.replace(/\/$/, '')
  }

  // Vercel provides VERCEL_URL without protocol.
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl}`
  }

  // Fallback to localhost with the detected PORT, defaulting to 3001 for this project.
  const port = process.env.PORT || '3000'
  const host = process.env.HOST || 'localhost'
  return `http://${host}:${port}`
}

function getGraphqlUri(): string {
  if (typeof window !== 'undefined') {
    // On the client, a relative URL works and keeps same-origin.
    return '/api/graphql'
  }
  // On the server, construct an absolute URL so Node fetch knows where to send the request.
  return `${getServerBaseUrl()}/api/graphql`
}

async function fetchGraphql(
  uri: RequestInfo | URL,
  options?: RequestInit,
  withTags = false
): Promise<Response> {
  if (typeof window === 'undefined' && isDemoMode()) {
    const body = typeof options?.body === 'string' ? options.body : '{}'
    return new Response(JSON.stringify(handleMockQuery(body)), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (withTags) {
    return fetch(uri, { ...options, next: { tags: ['drupal'] } } as RequestInit)
  }

  return fetch(uri, options)
}

// Client-side singleton to avoid re-creating the client.
let browserClient: ApolloClient<any> | null = null

export function getServerApolloClient(requestHeaders: Headers): ApolloClient<any> {
  // Derive origin from incoming request when possible to get exact host and port.
  const protocol = requestHeaders.get('x-forwarded-proto') || 'http'
  const forwardedHost = requestHeaders.get('x-forwarded-host')
  const host = forwardedHost || requestHeaders.get('host') || 'localhost:3000'
  const origin = `${protocol}://${host}`

  const httpLink = createHttpLink({
    uri: `${origin}/api/graphql`,
    // Tag fetch requests so revalidateTag('drupal') clears the Data Cache
    fetch: (uri: RequestInfo | URL, options?: RequestInit) =>
      fetchGraphql(uri, options, true),
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'ignore',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  })
}

// Default export remains for client usage via ApolloProvider.
const httpLink = createHttpLink({
  uri: getGraphqlUri(),
  fetch: (uri: RequestInfo | URL, options?: RequestInit) => fetchGraphql(uri, options),
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    }
  }
})

const client = typeof window !== 'undefined'
  ? (browserClient || (browserClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'ignore',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  })))
  : new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'ignore',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  })

export default client
