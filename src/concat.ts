import { Concat } from 'actions/ffmpeg'
import { join } from 'path'
import { CONFIG } from 'utils/config'

console.log('Running Concat in', CONFIG.NODE_ENV, 'mode')

async function run() {
  const sessionId = 'test'
  await Concat(
    [
      join(CONFIG.ASSET_FOLDER, 'intros', `${sessionId}.mp4`),
      join(CONFIG.ASSET_FOLDER, 'splits', `${sessionId}.mp4`),
      join(CONFIG.ASSET_FOLDER, 'outro.mp4'),
    ],
    join(CONFIG.ASSET_FOLDER, 'out', `${sessionId}.mp4`)
  )
}

run()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
