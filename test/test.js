const { markdoc } = require('../dist/markdoc.umd')
const options = {
  origin: './TEST.md',
  destination: './tmpDocs',
  toc: true,
  ignoreH1: true,
  tocDepth: 4
}

markdoc(options)
