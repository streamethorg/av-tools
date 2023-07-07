import { createClient, studioProvider } from '@livepeer/react'
import { createReadStream } from 'fs'
import dotenv from 'dotenv'
import { Session } from 'types'

dotenv.config()

if (!process.env.NEXT_PUBLIC_LIVEPEER_API_KEY) {
  console.error('process.env.NEXT_PUBLIC_LIVEPEER_API_KEY is not defined')
}

export async function uploadAsset(session: Session, path: string) {
  const { provider } = createClient({
    provider: studioProvider({
      apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY ?? '',
    }),
  })

  console.log('Uploading asset..')
  const stream = createReadStream(path)
  const asset = await provider.createAsset({
    sources: [
      {
        name: session.title,
        file: stream,
        storage: {
          ipfs: true,
          metadata: {
            name: session.title,
            ...session,
          },
        },
      },
    ],
  })

  return asset
}
