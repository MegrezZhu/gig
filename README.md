# gig it!
Useful repository managing CLI tool for packaging repo & generating .gitignore from [gitignore list](https://github.com/github/gitignore)!

## What can GIG do

1. Generating `.gitignore` file from pre-downloaded templates from [gitignore list](https://github.com/github/gitignore).
2. Packaging the whole project into one tar/zip, except those files that are ignored by the `.gitignore` rules. (Using `git archive` and making it simpler)

## Requirement

* Git

## Install

* using NPM

```bash
npm i -g gig-it
```

* or

```bash
git clone https://github.com/MegrezZhu/gig.git && cd gig
npm i .
```

## Usage

### Generating ignore rules

> Tired of creating .gitignore files manually?

#### Setup

templates fetching **required before generating**:

```bash
gig u
```

Or using proxy:

```bash
gig u -p http://localhost:1080
```

#### Basic Use

* create a `.gitignore` file at cwd: `gig g <template>`, e.g: `gig g node`
* output to stdout: `gig g node -s`

> useful with piping: `gig g node -s > a.txt`

### Packaging project

> Wanna send a cleaned & packaged project to collaborators or tutors?

#### Just pack it

At the project root:

```bash
gig p
```

For detailed options, type `gig p -h`

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
  p|pack [options]            pack the whole project, repecting .gitignore rules
```
