const fs = require('fs')
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('https://www.google.com')

  const source = await page.content()

  fs.writeFileSync('example.html', source)

  await browser.close()
})()
