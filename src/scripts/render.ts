import { join } from 'path'
import { bundle } from '@remotion/bundler'
import { getCompositions, renderMedia, renderStill } from '@remotion/renderer'
import { webpackOverride } from '../webpack-override'

const start = async () => {
  console.log('Find compositions...')
  const bundled = await bundle({
    entryPoint: join(process.cwd(), 'src', 'index.ts'),
    webpackOverride: (config) => webpackOverride(config),
  })

  const compositions = await getCompositions(bundled)
  console.log('Compositions', compositions)
  for (const composition of compositions) {
    console.log(`Rendering ${composition.id}...`)

    if (composition.id === 'session') {
      await renderMedia({
        codec: 'h264',
        composition,
        serveUrl: bundled,
        outputLocation: `assets/intros/${composition.id}.mp4`,
      })
    }

    if (composition.id === 'session-hd' || composition.id === 'session-social') {
      await renderStill({
        composition,
        serveUrl: bundled,
        output: `assets/${composition.id.replace('session-', '')}/${composition.id}.png`,
      })
    }
  }

  return

  // console.log('Fetch sessions...')
  // const sessionComp = compositions.find((c) => c.id === 'session')
  // const sessionHd = compositions.find((c) => c.id === 'session-hd')
  // const sessionSocial = compositions.find((c) => c.id === 'session-social')

  // const res = await fetch('https://web3privacy-summit.vercel.app/api/sessions')
  // const sessions = await res.json()

  // for (const session of sessions.data) {
  //   const { id } = session
  //   console.log(`- ${id}`)

  //   if (sessionComp) {
  //     await renderMedia({
  //       codec: 'h264',
  //       composition: sessionComp,
  //       serveUrl: bundled,
  //       outputLocation: `assets/intros/${id}.mp4`,
  //       inputProps: { session },
  //     })
  //   }

  //   if (sessionHd) {
  //     await renderStill({
  //       composition: sessionHd,
  //       serveUrl: bundled,
  //       output: `assets/hd/${id}.png`,
  //       inputProps: { session },
  //     })
  //   }

  //   if (sessionSocial) {
  //     await renderStill({
  //       composition: sessionSocial,
  //       serveUrl: bundled,
  //       output: `assets/social/${id}.png`,
  //       inputProps: { session },
  //     })
  //   }
  // }
}
start()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
