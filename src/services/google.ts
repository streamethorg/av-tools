import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
import path from 'path'

export async function Authenticate(scopes: string[]) {
  console.log('Authenticating with Google', scopes)
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../../', 'client_secret.json'), // MAKE SURE NOT TO COMMIT THE SECRET FILE
    scopes,
  })
  google.options({ auth })

  return google
}
