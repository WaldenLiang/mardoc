#!/usr/bin/env node
const program = require('commander')
const { mardoc } = require('../dist/mardoc.umd')

program
  .version('0.0.3', '-v, --version', 'output the current version')
  .description('A simple cli tool to convert markdown files to html docs')
  .requiredOption('-o, --origin <path>', 'the path of your md file')
  .requiredOption('-d, --destination <path>', 'the place will output your docs')
  .option('-t, --toc', 'the flag whether to generate the toc', false)
  .option('-i, --ignore-h1', 'the flag whether ignore heading 1 in the toc', true)
  .option('-D, --toc-depth [number]', 'the depth of the toc', 2)
  .option('-T, --theme <path>', 'the path of the your custom theme')

const options = program.parse(process.argv)
const { origin, destination, toc, ignoreH1, tocDepth, theme } = options
mardoc({ origin, destination, toc, ignoreH1, tocDepth, theme })

