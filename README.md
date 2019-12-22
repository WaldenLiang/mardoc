# mardoc

> A simple command line tool that can convert markdown files into html documents. 

## Installation

```shell
# install globally
npm install mardoc -g
# or install in your special project
npm install mardoc --save-dev
```

## New features (v1.0.0)

- Can convert multy markdown files at once.
- You can choose a variety of code block styles you like.
- A markdown will only generate an html file without external references, making your documents more introductory and easier to manage.

> Compared with the previous version, I added some new features in this version, and also solved some style problems.

## Usage

Very easy to use, if you installed the mardoc globally, you only enter like below on your terminal.

```shell
mardoc 
```

mardoc will automatically convert the `README.md` (that is, `./README.md`) files in the current path into html documents and save them in the `docs` (that is, `./docs`) folder in the current path.

More usage examples

```shell
# You can specify the path to the generated file, including the file name
mardoc -o ./TEST.md -d ./docs/index.html
# You can also convert all markdown files in a folder at once
mardoc -o ./dir/ -d ./docs/
```

By default, mardoc generates documents without a toc, but you can generate a toc for documents with the option `-t`. like below:

```shell
mardoc -t
```

You can also customize your theme very conveniently, you only need to rewrite the style in the theme directory. At last enter the command just like below:

```shell
mardoc -T /path/to/your/theme
```

In addition, **you can choose the style of the code block you like**, as long as you simply enter the parameter "-s"，like below:

```shell
mardoc -s dark
# Or
mardoc -s default
# Or
mardoc -s idea
# Or
mardoc -s xcode
# and other more styles
```

Here are all the code block styles [(highlight.js)](https://highlightjs.org/)

```javascript
'a11y-dark'
 'a11y-light'
 'agate'
 'an-old-hope'
 'androidstudio'
 'arduino-light'
 'arta'
 'ascetic'
 'atelier-cave-dark'
 'atelier-cave-light'
 'atelier-dune-dark'
 'atelier-dune-light'
 'atelier-estuary-dark'
 'atelier-estuary-light'
 'atelier-forest-dark'
 'atelier-forest-light'
 'atelier-heath-dark'
 'atelier-heath-light'
 'atelier-lakeside-dark'
 'atelier-lakeside-light'
 'atelier-plateau-dark'
 'atelier-plateau-light'
 'atelier-savanna-dark'
 'atelier-savanna-light'
 'atelier-seaside-dark'
 'atelier-seaside-light'
 'atelier-sulphurpool-dark'
 'atelier-sulphurpool-light'
 'atom-one-dark'
 'atom-one-dark-reasonable'
 'atom-one-light'
 'brown-paper'
 'brown-papersq'
 'codepen-embed'
 'color-brewer'
 'darcula'
 'dark'
 'darkula'
 'default'
 'docco'
 'dracula'
 'far'
 'foundation'
 'github'
 'github-gist'
 'gml'
 'googlecode'
 'gradient-dark'
 'grayscale'
 'gruvbox-dark'
 'gruvbox-light'
 'hopscotch'
 'hybrid'
 'idea'
 'ir-black'
 'isbl-editor-dark'
 'isbl-editor-light'
 'kimbie.dark'
 'kimbie.light'
 'lightfair'
 'magula'
 'mono-blue'
 'monokai'
 'monokai-sublime'
 'night-owl'
 'nord'
 'obsidian'
 'ocean'
 'paraiso-dark'
 'paraiso-light'
 'pojoaque'
 'purebasic'
 'qtcreator_dark'
 'qtcreator_light'
 'railscasts'
 'rainbow'
 'routeros'
 'school-book'
 'shades-of-purple'
 'solarized-dark'
 'solarized-light'
 'sunburst'
 'tomorrow'
 'tomorrow-night'
 'tomorrow-night-blue'
 'tomorrow-night-bright'
 'tomorrow-night-eighties'
 'vs'
 'vs2015'
 'xcode'
 'xt256'
 'zenburn'
```

All options supported

```shell
Usage: mardoc [options]

A simple command line tool that can convert markdown files into html documents.

Options:
  -v, --version                  output the current version
  -o, --origin <path>            Enter the path of the markdown file or the folder where the markdown file is located (default: "./README.md")
  -d, --destination <path>       Document generated path, which can be a html file path or a folder path (default: "./docs")
  -t, --toc                      Choose whether you need to generate a toc (default: false)
  -i, --ignore-h1                Choose whether to ignore heading 1 when generating a toc (default: true)
  -D, --toc-depth [number]       Toc hierarchy (default: 2)
  -T, --theme <path>             Custom theme path
  -s, --code-block-style <name>  choose a code block style you like (default: "github")
  -h, --help                     output usage information
```

Thanks a lot!!