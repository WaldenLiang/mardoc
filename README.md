# mardoc

> A simple command line tool to convert a markdown file into an HTML document.

## Installation

```shell
# install globally
npm install mardoc -g
# or install in your special project
npm install mardoc --save-dev
```

## Usage

```shell
mardoc -o ./README.md -d ./docs/ -t
```

options

```shell
Usage: mardoc [options]

A simple cli tool to convert markdown files to html doc files

Options:
  -v, --version             output the current version
  -o, --origin <path>       the path of your md file
  -d, --destination <path>  the place will output your docs
  -t, --toc                 the flag whether generate the toc (default: false)
  -i, --ignore-h1           the flag whether ignore heading 1 in the toc (default: true)
  -D, --toc-depth [number]  the depth of the toc (default: 2)
  -T, --theme <path>        the path of the your custom theme
  -h, --help                output usage information
```

The origin and the destination is required.

You also can override the theme, just copy the theme dir in the markdoc project to another place as your own theme dir, and override the main.css. At last enter the command just like below:

```shell
mardoc -o ./README.md -d ./docs/ -T /path/to/your-theme
```
