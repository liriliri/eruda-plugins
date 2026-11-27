# eruda-features

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![License][license-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/eruda-features.svg
[npm-url]: https://npmjs.org/package/eruda-features
[ci-image]: https://github.com/liriliri/eruda-plugins/actions/workflow/status/main.yml?branch=master&style=flat-square
[ci-url]: https://github.com/liriliri/eruda-plugins/actions/workflows/main.yml
[license-image]: https://img.shields.io/npm/l/eruda-features.svg

Eruda plugin for browser feature detections, thanks to [modernizr](https://github.com/Modernizr/Modernizr) project.

Red means unsupported, otherwise ok. All buttons is linked directly to related materials in [Can I Use](http://caniuse.com/) website.

## Demo

Browse it on your phone: 
[https://eruda.liriliri.io/?plugin=features](https://eruda.liriliri.io/?plugin=features)

## Install

```bash
npm install eruda-features --save
```

```javascript
eruda.add(erudaFeatures);
```

Make sure Eruda is loaded before this plugin, otherwise won't work.