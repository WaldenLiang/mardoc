#!/usr/bin/env node
const program = require('commander')
const { mardoc } = require('../dist/mardoc.umd')
const ora = require('ora')
const chalk = require('chalk')

program
  .version('1.0.0', '-v, --version', 'output the current version')
  .description('A simple cli tool used to convert markdown files to html document files')
  .option('-o, --origin <path>', 'the path of your single md file or a dir', './README.md')
  .option('-d, --destination <path>', 'the place will output your docs', './docs')
  .option('-t, --toc', 'the flag whether to generate the toc', false)
  .option('-i, --ignore-h1', 'the flag whether ignore heading 1 in the toc', true)
  .option('-D, --toc-depth [number]', 'the depth of the toc', 2)
  .option('-T, --theme <path>', 'the path of the your custom theme')
  .option('-s, --code-block-style <name>', 'choose a code block style you like', 'github')

const spinner = ora(`Task in progress...`)
spinner.start()

const options = program.parse(process.argv)
mardoc(options).then(() => {
  spinner.stop()
  console.log(chalk.cyan('  Converted successfully.\n'))
}).catch(e => {
  spinner.stop()
  console.log(chalk.red(`  ${e.message}\n`))
})

