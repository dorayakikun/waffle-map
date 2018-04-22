const puppeteer = require('puppeteer')
const connect = require('connect')
const serveStatic = require('serve-static')
const del = require('del')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./screenshot.config.json', 'utf8'))

del.sync([config.outdir])
fs.mkdirSync(config.outdir)

const app = connect()
app.use(serveStatic(config.storybookdir))
server = app.listen(6006)
;(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  try {
    for (const kind of Object.keys(config.storiesByKind)) {
      for (const story of config.storiesByKind[kind]) {
        const storyName = encodeURIComponent(story.name)
        await page.goto(
          `http://127.0.0.1:6006/iframe.html?selectedKind=${kind}&selectedStory=${storyName}`,
          { waitUntil: 'networkidle2' }
        )
        await page.screenshot({
          path: `./__screenshots__/${kind}-${story.name}.png`,
        })
      }
    }
  } catch (e) {
    console.log(e)
  } finally {
    await browser.close()
    server.close()
  }
})()
