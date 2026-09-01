/**
 * Drupal client singleton using decoupled-client.
 *
 * This clone defaults to demo mode and must also build cleanly without a
 * generated Drupal schema. Keep the client shape local so Vercel does not
 * depend on `decoupled-cli schema sync` having run before `next build`.
 */

import { createClient } from 'decoupled-client'
import { isDemoMode, handleMockQuery } from './demo-mode'

type TypedClient = {
  getEntries: (...args: any[]) => Promise<any>
  getEntry: (...args: any[]) => Promise<any>
  getEntryByPath: (path: string) => Promise<any>
  raw: (query: any, variables?: any) => Promise<any>
}

let _client: TypedClient | null = null
let _mockClient: TypedClient | null = null

function createMockTypedClient(): TypedClient {
  if (_mockClient) return _mockClient

  _mockClient = {
    async getEntries() { return [] },
    async getEntry() { return null },
    async getEntryByPath(path: string) {
      if (!path || path === '/') {
        const result = handleMockQuery(JSON.stringify({
          query: 'GetHomepageData nodeHomepages',
          variables: {},
        }))
        return result?.data?.nodeHomepages?.nodes?.[0] || null
      }

      const result = handleMockQuery(JSON.stringify({
        query: 'route',
        variables: { path },
      }))
      return result?.data?.route?.entity || null
    },
    async raw(query: any, variables?: any) {
      const result = handleMockQuery(JSON.stringify({
        query: typeof query === 'string' ? query : '',
        variables,
      }))
      return result?.data ?? result
    },
  }

  return _mockClient
}

export function getClient(): TypedClient {
  if (isDemoMode()) return createMockTypedClient()
  if (_client) return _client

  const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
  const clientId = process.env.DRUPAL_CLIENT_ID
  const clientSecret = process.env.DRUPAL_CLIENT_SECRET

  if (!baseUrl || !clientId || !clientSecret) {
    throw new Error(
      'Missing Drupal credentials. Set NEXT_PUBLIC_DRUPAL_BASE_URL, DRUPAL_CLIENT_ID, DRUPAL_CLIENT_SECRET.',
    )
  }

  const base = createClient({
    baseUrl,
    clientId,
    clientSecret,
    fetch: ((input: RequestInfo | URL, init?: RequestInit) =>
      globalThis.fetch(input, {
        ...init,
        next: { tags: ['drupal'] },
      } as RequestInit)) as typeof globalThis.fetch,
  })

  _client = {
    async getEntries() { return [] },
    async getEntry() { return null },
    async getEntryByPath(path: string) {
      return base.queryByPath(path, `
        query ($path: String!) {
          route(path: $path) {
            ... on RouteInternal {
              entity { ... on NodePage { __typename id title path body { processed } } }
            }
          }
        }
      `)
    },
    async raw(query: any, variables?: any) {
      return base.query(query, variables)
    },
  }

  return _client
}
