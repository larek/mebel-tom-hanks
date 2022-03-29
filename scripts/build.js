#!/usr/bin/env node

const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
const path = require("path");
const { writeFileSync } = require("fs");
const { build } = require("vite");
const SRC = path.join(__dirname, "../src");

(async () => {
  const loader = new TwingLoaderFilesystem(SRC);
  const twing = new TwingEnvironment(loader);
  const data = await require(path.join(__dirname, "../src/data.js"));
  const html = await twing.render("index.twig", { data });
  writeFileSync(SRC + "/index.html", html);
  await build({
    root: SRC,
    publicDir: path.join(__dirname, "../public"),
    build: {
      outDir: path.join(__dirname, "../dist"),
      emptyOutDir: true,
    },
  });
})();
