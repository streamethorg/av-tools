import { GetItems, GetScheduleInfo } from 'services/schedule'
import { CONFIG } from 'utils/config'

console.log('Running in', CONFIG.NODE_ENV, 'mode')

Run()

async function Run() {
  const sheetId = '1gH2j8-IUjoK6dTXAyTQ-zmd5O0RKtmqjNhDLV7DE6nE' // Scheduling template
  await GetScheduleInfo(sheetId)
  await GetItems(sheetId)

  process.exit(0)
}
