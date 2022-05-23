#!/usr/bin/env node

const { TwingEnvironment, TwingLoaderFilesystem } = require("twing")
const path = require("path")
const { writeFileSync, readFileSync } = require("fs")
const { build } = require("vite")
const SRC = path.join(__dirname, "../src")
const PUBLIC_DIR = path.join(__dirname, "../public")
const arg = require("arg")
const args = arg({ "--source": String, "--robots": Boolean })
const dataSource = args["--source"] ?? "data-landing-1.js"
const robotsSource = args["--robots"] ? SRC + "/robots-allow.txt" : SRC + "/robots-disallow.txt"
const robots = readFileSync(robotsSource);

(async () => {
  const loader = new TwingLoaderFilesystem(SRC)
  const twing = new TwingEnvironment(loader)
  const data = await require(path.join(__dirname, `../src/${dataSource}`))
  const html = await twing.render("index.twig", { data })
  writeFileSync(PUBLIC_DIR + "/robots.txt", robots)
  writeFileSync(SRC + "/index.html", html)
  await build({
    root: SRC,
    publicDir: path.join(__dirname, "../public"),
    build: {
      outDir: path.join(__dirname, "../dist"),
      emptyOutDir: true
    }
  })
})()
