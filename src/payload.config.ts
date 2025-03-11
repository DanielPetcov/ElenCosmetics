// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

// collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Collection } from './collections/Collections'
import { TermsPage } from './collections/TermsPages'
import { Orders } from './collections/Orders'
import { Volume } from './collections/Volume'
import { Brand } from './collections/Brand'

// globals
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'
import { Header } from './globals/Header'
import { ProductPageGlobal } from './globals/ProductPage'
import { Contact } from './globals/Contact'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users, 
    Media, 
    Products, 
    Collection,
    TermsPage,
    Orders,
    Volume,
    Brand
  ],
  globals: [
    Footer,
    HomePage,
    Header,
    ProductPageGlobal,
    Contact
  ],
  editor: lexicalEditor({
    features: ({defaultFeatures}) => [
      ...defaultFeatures
    ]
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({filename}) => {
            return `${process.env.S3_PUBLIC_BUCKET_URL}/elen-cosmetic/${filename}`
          },
          disableLocalStorage: true,
        }
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID  || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID || '' ,
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT || ''
      }
    })
  ],
  localization: {
    locales: [
      {
        label: 'Romanian',
        code: 'ro'
      }, 
      {
        label: 'Russian',
        code: 'ru'
      }
    ],
    defaultLocale: 'ro'
  }
})
