# eruda-plugin

[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![CI][ci-image]][ci-url]

Eruda plugin template. Scaffolds a new eruda plugin project from one of the
bundled templates.

## Install

```bash
npm install -g eruda-plugin
```

## Usage

```bash
eruda-plugin
```

Choose which template you want and then enter the name of your eruda plugin.
The plugin is generated into an `eruda-<name>` directory in the current working
directory.

Currently there are two types of templates:

* Simple: Simple plugin with only one source file, no build tooling required.
* Webpack: Complex plugin with es6 and scss support.

Both templates generate a plugin that extends `eruda.Tool` and ships an ES5
compatible bundle.

## Commonly used NPM scripts

```bash
# watch and auto re-build.
npm run dev
# build dist files.
npm run build
# lint source files.
npm run lint
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/eruda-plugin.svg
[npm-url]: https://npmjs.org/package/eruda-plugin
[license-image]: https://img.shields.io/npm/l/eruda-plugin.svg
[license-url]: https://github.com/liriliri/eruda-plugins/blob/master/LICENSE
[ci-image]: https://github.com/liriliri/eruda-plugins/actions/workflow/status/main.yml?branch=master&style=flat-square
[ci-url]: https://github.com/liriliri/eruda-plugins/actions/workflow/status/main.yml
