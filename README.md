# gignore
A CLI tool that simply download specific .gitignore template from [gitignore list](https://github.com/github/gitignore)

## Install
```bash
git clone git@github.com:MegrezZhu/gignore.git & cd gignore
npm i .
```

## Use

```
Usage: gignore [options] [command]
Options:
  -V, --version  output the version number
  -h, --help     output usage information
Commands:
  l [options]             list all .gitignore template names
  d [options] <template>  download specific .gitignore template
```
### download a .gitignore file

```bash
gignore d Node
```

### list all templates

```bash
gignore l
```

### proxy

```bash
gignore d Node -p http://localhost:1080
```

