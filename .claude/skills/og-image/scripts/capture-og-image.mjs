#!/usr/bin/env node
import { mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'
import { chromium } from 'playwright'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '../../../../')

config({ path: join(projectRoot, '.env') })

const slug = process.argv[2]
if (!slug) {
  console.error('Error: slug is required')
  console.error('Usage: node capture-og-image.mjs <slug>')
  process.exit(1)
}

const url = `http://localhost:4321/og/${slug}/screenshot`
const outputDir = join(projectRoot, 'public', 'og')
const outputPath = join(outputDir, `${slug}.jpg`)

console.log(`URL:    ${url}`)
console.log(`Output: ${outputPath}`)

await mkdir(outputDir, { recursive: true })

let browser
try {
  browser = await chromium.launch({
    executablePath: process.env.CHROME_EXECUTABLE_PATH,
    args: ['--disable-gpu'],
  })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1200, height: 630 })

  let response
  try {
    response = await page.goto(url, { waitUntil: 'networkidle', timeout: 10_000 })
  } catch (err) {
    if (err.message.includes('ECONNREFUSED') || err.message.includes('ERR_CONNECTION_REFUSED')) {
      console.error('Error: Cannot connect to dev server.')
      console.error('Please start the dev server first: pnpm dev')
      process.exit(2)
    }
    throw err
  }

  if (response && !response.ok()) {
    console.error(`Error: Page returned HTTP ${response.status()} for ${url}`)
    console.error('Check that the slug is correct and the dev server is running.')
    process.exit(3)
  }

  const buffer = await page.screenshot({ type: 'jpeg', quality: 95, fullPage: false })

  await sharp(buffer)
    .resize(1200, 630, { fit: 'fill' })
    .jpeg({ quality: 95 })
    .toFile(outputPath)

  console.log(`Saved: ${outputPath}`)
} finally {
  if (browser) await browser.close()
}
