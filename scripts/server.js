#!/usr/bin/env node

const { TwingEnvironment, TwingLoaderFilesystem } = require("twing")
const path = require("path")
const { writeFileSync } = require("fs")
const SRC = path.join(__dirname, "../src")
const { watch } = require("chokidar")
const { createServer } = require("vite")
const arg = require("arg")
const args = arg({ "--source": String })
const dataSource = args["--source"] ?? "data/landing-1.js"

const createHtml = async () => {
  const loader = new TwingLoaderFilesystem(SRC)
  const twing = new TwingEnvironment(loader)
  const data = await require(path.join(__dirname, `../src/${dataSource}`))
  const html = await twing.render("template/index.twig", { data })
  writeFileSync(SRC + "/index.html", html)
}

// Create dev server
const createDevServer = async (watcher) => {
  createHtml()

  const server = await createServer({
    mode: "development",
    watcher,
    root: SRC,
    publicDir: path.join(__dirname, "../public"),
    server: {
      port: 1337,
      open: true
    }
  })

  await server.listen()

  server.printUrls()
}

// Create watcher
const watcher = watch(SRC, {
  ignored: /index.html/,
  persistent: true,
  ignoreInitial: true
})

// Add watcher listeners
watcher.on("ready", () => createDevServer(watcher))
watcher.on("change", () => createHtml())
