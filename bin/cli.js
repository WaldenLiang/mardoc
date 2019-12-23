#!/usr/bin/env node
const program = require('commander')
const { mardoc } = require('../dist/mardoc.umd')
const ora = require('ora')
const chalk = require('chalk')

program
  .version('1.0.1', '-v, --version', 'output the current version')
  .description('A simple command line tool that can convert markdown files into html documents.')
  .option('-o, --origin <path>', 'Enter the path of the markdown file or the folder where the markdown file is located', './README.md')
  .option('-d, --destination <path>', 'Document generated path, which can be a html file path or a folder path', './docs')
  .option('-t, --toc', 'Choose whether you need to generate a toc', false)
  .option('-i, --ignore-h1', 'Choose whether to ignore heading 1 when generating a toc', true)
  .option('-D, --toc-depth [number]', 'Toc hierarchy', 2)
  .option('-T, --theme <path>', 'Custom theme path')
  .option('-s, --code-block-style <name>', 'choose a code block style you like', 'github')

const spinner = ora(`Task in progress...\n`)
spinner.start()

const options = program.parse(process.argv)
mardoc(options).then(() => {
  spinner.stop()
  console.log(chalk.cyan('  Converted successfully.\n'))
}).catch(e => {
  spinner.stop()
  console.log(chalk.red(`  ${e.message}\n`))
}).finally(() => {
  spinner.stop()
})

