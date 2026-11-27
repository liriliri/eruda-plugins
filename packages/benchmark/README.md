# eruda-benchmark

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![License][license-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/eruda-benchmark.svg
[npm-url]: https://npmjs.org/package/eruda-benchmark
[ci-image]: https://github.com/liriliri/eruda-plugins/actions/workflow/status/main.yml?branch=master&style=flat-square
[ci-url]: https://github.com/liriliri/eruda-plugins/actions/workflows/main.yml
[license-image]: https://img.shields.io/npm/l/eruda-benchmark.svg

Eruda plugin for running JavaScript benchmarks.

## Demo

Browse it on your phone: 
[http://eruda.liriliri.io/?plugin=benchmark](http://eruda.liriliri.io/?plugin=benchmark)

## Install

```bash
npm install eruda-benchmark --save
```

```javascript
eruda.add(erudaBenchmark);
```

Make sure Eruda is loaded before this plugin, otherwise won't work.

## Usage

After initialization:

```javascript
var benchmark = eruda.get('benchmark');

benchmark.add('Test', function () 
{
    var arr = new Array(10000); 
    for (var i = 0; i < 10000; i++) arr[i] = i * 2;
});
benchmark.add('Test Suite', [
    {
        name: 'RegExp#test',
        fn: function () 
        {
            /o/.test('Hello World!');
        }
    },
    {
        name: 'String#indexOf',
        fn: function () 
        {
            'Hello World!'.indexOf('o') > -1;
        }
    },
    {
        name: 'String#match',
        fn: function ()
        {
            !!'Hello World!'.match(/o/);
        }
    }
]);
```