# gig
A CLI tool that simply generate specific .gitignore template downloaded from [gitignore list](https://github.com/github/gitignore)

## Install

* using NPM

```bash
npm i -g ignore-gen
```

* or

```bash
git clone https://github.com/MegrezZhu/gig.git && cd gig
npm i .
```

## Usage

### Setup

templates fetching **required before generating**:

```bash
gig u
```

Or using proxy:

```bash
gig u -p http://localhost:1080
```

### Basic Use

* create a `.gitignore` file at cwd: `gig g <template>`, e.g: `gig g node`
* output to stdout: `gig g node -s`

> useful with piping: `gig g node -s > a.txt`

### More

see `gig -h` or `gig <command> -h`

```
Usage: gig [options] [command]
Options:
  -V, --version  output the version number
  -h, --help     output usage information
Commands:
  u|update [options]          fetch & update cached templates
  l|list                      list all available .gitignore template
  g|gen [options] <template>  generate .gitignore with specified template
  c|clear                     clear cached templates
```
