import { join } from 'path'
import dotenv from 'dotenv'
import { mkdirSync } from 'fs'

dotenv.config()

export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  ASSET_FOLDER: process.env.INPUT_FOLDER || join(process.cwd(), 'assets'),
  BITRATE: process.env.BITRATE || 128,

  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
}
;(() => {
  console.log('Create required folders..')

  mkdirSync(join(CONFIG.ASSET_FOLDER, 'hd'), { recursive: true })
  mkdirSync(join(CONFIG.ASSET_FOLDER, 'intros'), { recursive: true })
  mkdirSync(join(CONFIG.ASSET_FOLDER, 'out'), { recursive: true })
  mkdirSync(join(CONFIG.ASSET_FOLDER, 'social'), { recursive: true })
  mkdirSync(join(CONFIG.ASSET_FOLDER, 'splits'), { recursive: true })
})()
