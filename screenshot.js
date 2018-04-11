const puppeteer = require('puppeteer')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./screenshot.config.json', 'utf8'))

const HOST = 'http://127.0.0.1'(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  for (const kind of Object.keys(config.storiesByKind)) {
    for (const story of config.storiesByKind[kind]) {
      const storyName = encodeURIComponent(story.name)
      await page.goto(
        `${HOST}:6006/iframe.html?selectedKind=${kind}&selectedStory=${storyName}`,
        { waitUntil: 'networkidle2' }
      )
      await page.screenshot({
        path: `./__screenshots__/${kind}-${story.name}.png`,
      })
    }
  }

  await browser.close()
})()
