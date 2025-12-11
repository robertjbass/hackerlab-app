// TODO - figure out if Payload supports front-end queries yet, if not, use this
import { type PaginatedDocs } from 'payload'
import type { Config } from '@/payload-types'

enum PayloadStatus {
  OK = 200,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

type PayloadCollectionSlug = keyof Config['collections']
export type CollectionEntity<T extends PayloadCollectionSlug> =
  Config['collections'][T] & {
    media: Config['collections']['media'] // media collection is often aliased to icon/screenshot, etc
  }

type PopulateKeys<T extends PayloadCollectionSlug> =
  keyof Config['collections'][T]

export type PopulateFields = Omit<
  | {
      [K in PayloadCollectionSlug]?: {
        [CK in PopulateKeys<K>]?: true
      }
    }
  | {
      [K in PayloadCollectionSlug]?: {
        [CK in PopulateKeys<K>]?: false
      }
    },
  'payload-locked-documents' | 'payload-preferences' | 'payload-migrations'
>

type WhereOperators<T = any> = {
  equals?: T
  not_equals?: T
  greater_than?: T
  greater_than_equal?: T
  less_than?: T
  less_than_equal?: T
  like?: string
  contains?: T
  in?: T[]
  not_in?: T[]
  all?: T[]
  exists?: boolean
}

type WhereFieldConstraints<T> = {
  [K in keyof T]?: T[K] extends object
    ? WhereFieldConstraints<T[K]> | WhereOperators<T[K]>
    : WhereOperators<T[K]> | T[K]
}

// Recursive type to allow nested and/or clauses
type WhereCondition<T> = WhereFieldConstraints<T> & {
  and?: WhereCondition<T>[]
  or?: WhereCondition<T>[]
}

type SelectFields<T> = {
  [K in keyof T]?: boolean
}

type PayloadWhereClause<T> =
  | WhereCondition<T>
  | {
      [key: `${string}.${string}`]: WhereOperators
    }
  | {
      [key: `${string}.${string}.${string}`]: WhereOperators
    }

type PayloadQueryParams<T extends PayloadCollectionSlug> = {
  collection: T
  where?: PayloadWhereClause<CollectionEntity<T>>
  limit?: number
  offset?: number
  sort?: string | string[]
  depth?: number
  populate?: PopulateFields
  select?: SelectFields<CollectionEntity<T>>
  pagination?: boolean
}

type PayloadResponse<T extends PayloadCollectionSlug> = {
  status: number
  message: string
  data: PaginatedDocs<Config['collections'][T]>
}

const isServer = typeof window === 'undefined'

const bypass = process.env.NEXT_PUBLIC_VERCEL_AUTOMATION_BYPASS_SECRET as string

const host = isServer
  ? process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
  : ''

async function getCookieHeader() {
  if (!isServer) return undefined
  const { cookies } = await import('next/headers')
  return (await cookies()).toString() || undefined
}

// forward cookies and add bypass header for vercel protection deployments
async function generateClientSideHeaders() {
  const cookie = await getCookieHeader()
  const headers = {
    'Content-Type': 'application/json',
    ...(bypass && { 'x-vercel-protection-bypass': bypass }),
    ...(cookie ? { cookie } : {}),
  }

  return headers
}

export async function queryPayload<T extends PayloadCollectionSlug>(
  params: PayloadQueryParams<T>,
): Promise<PaginatedDocs<Config['collections'][T]>> {
  const method = 'POST'
  const url = `${host}/api/payload`

  try {
    const response = await fetch(url, {
      method,
      headers: await generateClientSideHeaders(),
      credentials: 'include',
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const responseJson = (await response.json()) as PayloadResponse<T>

    if (responseJson.status !== PayloadStatus.OK) {
      throw new Error(
        `API request failed with status ${responseJson.status} - ${responseJson.message}`,
      )
    }
    return responseJson.data
  } catch (error) {
    console.error('Payload query error:', error)
    throw error
  }
}
