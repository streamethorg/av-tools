import concat from 'ffmpeg-concat'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import { CONFIG } from 'utils/config'
import { createReadStream, existsSync, ReadStream } from 'fs'
import * as child from 'child_process'

export function ToStream(filepath: string) {
  return createReadStream(filepath, { encoding: 'utf8' })
}

export async function ToMp3(id: string, stream: ReadStream, bitrate = CONFIG.BITRATE) {
  console.log('Convert to mp3', id)

  try {
    ffmpeg(stream).audioBitrate(bitrate).format('mp3').save(`${CONFIG.ASSET_FOLDER}/mp3/${id}.mp3`).on('error', console.error)
  } catch (error) {
    console.log('Unable to convert to mp3', id, error)
  }
}

export async function ToMp4(id: string, stream: ReadStream) {
  console.log('Convert to mp4', id)

  try {
    ffmpeg(stream).format('mp4').save(`${CONFIG.ASSET_FOLDER}/mp4/${id}.mp4`).on('error', console.error)
  } catch (error) {
    console.log('Unable to convert to mp3', id, error)
  }
}

export async function Concat(inputs: string[], output: string) {
  console.log('Concat', inputs.length, 'videos to', output)

  await concat({
    output: output,
    videos: inputs,
    transition: {
      name: 'fade', // Options: fade, directionalwipe, circleopen, squareswire
      duration: 750,
    },
  })
}

export async function Split(stream: string | ReadStream, outputs: { id: string; start: number; end: number }[]) {
  console.log('Splitting to', outputs.length, 'videos')

  for (const output of outputs) {
    const file = `${CONFIG.ASSET_FOLDER}/splits/${output.id}.mp4`
    console.log('Split to', output.id, output.start, output.end)

    if (existsSync(file)) {
      console.log('File already exists', file)
      continue
    }

    // To fix Segmentation fault (core dumped), install nscd
    // `sudo apt install nscd`
    child.execSync(`${ffmpegPath ?? 'ffmpeg'} -i ${stream} -ss ${output.start} -to ${output.end} -c:v libx264 -c:a copy -y ${file}`, {
      stdio: 'inherit',
    })

    if (existsSync(file)) {
      console.log('Successfully split', output.id)
    }
  }
}
