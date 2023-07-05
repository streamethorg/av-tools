import { Split } from 'utils/ffmpeg'
import { CONFIG } from 'utils/config'

console.log('Running Split in', CONFIG.NODE_ENV, 'mode')

Run()

async function Run() {
  // createReadStream('/input/stream.mp4')

  console.log('CONFIG', CONFIG.ASSET_FOLDER)
  // W3PS - Morning
  await Split('https://lp-playback.com/hls/3a4bx5f32spabh28/index.m3u8', [
    { id: 'test', start: 4330, end: 4390 },
    // { id: 'sessiontornadocash2023keylearnings', start: 637, end: 2213 },
    // { id: 'sessionprivacyinfrastructuremaintenance', start: 2257, end: 4004 },
    // { id: 'sessionriseanon-lunarpunkandmemeticwarfare2', start: 4330, end: 7078 },
    // { id: 'sessionprivacybusinessfireside', start: 7110, end: 8961 },
    // { id: 'sessioncypherpunksvsmainstreamprivacy', start: 9070, end: 11294 },
    // { id: 'sessionprivacydystopiaandhowtohandleit', start: 11407, end: 12997 },
  ])

  // // W3PS - Afternoon
  // await Split('https://lp-playback.com/hls/5ff2j9ryrco2oxx8/index.m3u8', [
  //   // { id: 'sessionhowprivacycouldenablehumanrights', start: 124, end: 2486 },
  //   // { id: 'sessionhowprivacyelectroniccashandcypherpunktechincreaseourfreedom', start: 2552, end: 3945 },
  //   { id: 'sessionwhyprivatevotingmatters', start: 4031, end: 5144 },
  //   // { id: 'sessiondataandmeta-dataexposedinwalletsandrpc', start: 5380, end: 6564 },
  //   // { id: 'sessionzeroleakscommunication', start: 6722, end: 7810 },
  //   // { id: 'sessionananonymoustrustandcreditsystem', start: 8065, end: 9701 },
  //   // { id: 'sessionprivacymessagingprotocols', start: 9757, end: 11322 },
  //   // { id: 'sessionprivacytoolingfireside', start: 11384, end: 12544 },
  //   // { id: 'sessionprivacyecosystemscalability', start: 12637, end: 14189 },
  //   // { id: 'sessionprivacycoinsregulation', start: 14289, end: 15962 },
  //   // { id: 'sessionw3pnecosystemlaunch-closingceremony', start: 16008, end: 16824 },
  // ])
}
