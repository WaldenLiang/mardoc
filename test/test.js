const { mardoc } = require('../dist/mardoc.umd')
const options = {
  origin: './TEST.md',
  destination: './tmpDocs',
  toc: true,
  ignoreH1: true,
  tocDepth: 4
}

mardoc(options)
