import path from 'path'
import sharp from 'sharp'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { authjsPlugin } from 'payload-authjs'
import { authConfig } from '@/lib/auth.config'
import { Users, Media } from '@/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET
const DATABASE_URL = process.env.DATABASE_URL
const BLOB_PREFIX = process.env.BLOB_PREFIX
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

if (
  !PAYLOAD_SECRET ||
  !DATABASE_URL ||
  !BLOB_PREFIX ||
  !BLOB_READ_WRITE_TOKEN
) {
  throw new Error('Missing environment variables')
}

const collections = [Users, Media]

export default buildConfig({
  serverURL: NEXT_PUBLIC_SITE_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        login: {
          Component: '@/components/admin/login#CustomLoginForm',
        },
      },
    },
  },
  collections,
  editor: lexicalEditor(),
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: DATABASE_URL },
    push: process.env.NODE_ENV === 'development',
  }),
  sharp: sharp as any, // sharp types are not compatible with PayloadCMS expected types
  plugins: [
    vercelBlobStorage({
      collections: {
        media: {
          prefix: BLOB_PREFIX,
        },
      },
      token: BLOB_READ_WRITE_TOKEN,
    }),
    authjsPlugin({ authjsConfig: authConfig }),
  ],
})
