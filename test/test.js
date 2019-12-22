const { mardoc } = require('../dist/mardoc.umd')
const options = {
  origin: './',
  destination: './tmpDocs',
  toc: true,
  ignoreH1: true,
  tocDepth: 6,
  codeBlockStyle: 'darkula'
}

mardoc(options).then(() => {
  console.log('successfully')
}).catch(e => {
  console.log(e.message)
})

