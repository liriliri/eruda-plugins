# eruda-plugins

Monorepo for [Eruda](https://github.com/liriliri/eruda) plugins, managed as an
npm workspace.

## Packages

| Package | Description | Version |
| --- | --- | --- |
| [`eruda-features`](./packages/features) | Browser feature detections, powered by [modernizr](https://github.com/Modernizr/Modernizr) | 2.1.0 |
| [`eruda-monitor`](./packages/monitor) | FPS, memory and DOM node monitoring | 1.1.2 |
| [`eruda-benchmark`](./packages/benchmark) | JavaScript benchmarking | 2.0.1 |
| [`eruda-geolocation`](./packages/geolocation) | Testing geolocation | 2.1.0 |
| [`eruda-timing`](./packages/timing) | Performance and resource timing | 2.0.1 |
| [`eruda-code`](./packages/code) | Running JavaScript code | 2.2.0 |
| [`eruda-orientation`](./packages/orientation) | Testing orientation api | 2.1.1 |
| [`eruda-touches`](./packages/touches) | Visualizing screen touches | 2.1.0 |

## Layout

```
eruda-plugins/
├── packages/
│   ├── features/             # published as `eruda-features`
│   ├── monitor/              # published as `eruda-monitor`
│   ├── benchmark/            # published as `eruda-benchmark`
│   ├── geolocation/          # published as `eruda-geolocation`
│   ├── timing/               # published as `eruda-timing`
│   ├── code/                 # published as `eruda-code`
│   ├── orientation/          # published as `eruda-orientation`
│   └── touches/              # published as `eruda-touches`
├── package.json            # workspace root, private
└── .github/workflows/       # CI and publish pipelines
```

Each plugin keeps its own `package.json`, webpack config, README, CHANGELOG and
LICENSE, and is published to npm under its own name.

## Usage

```javascript
eruda.add(erudaFeatures)
eruda.add(erudaMonitor)
```

## Development

Install every workspace dependency from the repository root:

```bash
npm install
```

Shared build tooling (webpack, babel, sass, eslint, ...) lives in the root
`package.json`, so a single install covers all packages. A package only declares
what is specific to it.

Common commands, run from the root:

```bash
npm run build      # build every package
npm run lint       # lint every package
npm run ci         # lint + build + es5 check for every package
npm run format     # format every package with prettier
```

To work on a single package:

```bash
npm run build --workspace=packages/features
npm run dev --workspace=packages/monitor      # dev server on http://localhost:8081
```

`npm run dev:features`, `npm run dev:monitor`, `npm run dev:benchmark`,
`npm run dev:geolocation`, `npm run dev:timing`, `npm run dev:code`,
`npm run dev:orientation` and `npm run dev:touches` are shortcuts for the dev
servers (ports 8080, 8081, 8082, 8083, 8084, 8085, 8086 and 8087 respectively).

## Publishing

Build artifacts are written to the package root
(`packages/features/eruda-features.js`, `packages/monitor/eruda-monitor.js`,
`packages/benchmark/eruda-benchmark.js`,
`packages/geolocation/eruda-geolocation.js`,
`packages/timing/eruda-timing.js`, `packages/code/eruda-code.js`,
`packages/orientation/eruda-orientation.js`,
`packages/touches/eruda-touches.js`) and are git-ignored.

Publishing is a manual action: dispatch the `Publish to NPM` workflow and pick the
plugin to publish with the `package` input.

| Input | Publishes |
| --- | --- |
| `features` | `eruda-features` |
| `monitor` | `eruda-monitor` |
| `benchmark` | `eruda-benchmark` |
| `geolocation` | `eruda-geolocation` |
| `timing` | `eruda-timing` |
| `code` | `eruda-code` |
| `orientation` | `eruda-orientation` |
| `touches` | `eruda-touches` |

Only the selected plugin is built and published. The `NPM_TOKEN` secret is required.

## License

[MIT](./LICENSE)
