# eruda-plugins

Monorepo for [Eruda](https://github.com/liriliri/eruda) plugins, managed as an
npm workspace.

## Packages

| Package | Description | Version |
| --- | --- | --- |
| [`eruda-features`](./packages/features) | Browser feature detections, powered by [modernizr](https://github.com/Modernizr/Modernizr) | 2.1.0 |
| [`eruda-monitor`](./packages/monitor) | FPS, memory and DOM node monitoring | 1.1.2 |

## Layout

```
eruda-plugins/
├── packages/
│   ├── features/             # published as `eruda-features`
│   └── monitor/              # published as `eruda-monitor`
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

`npm run dev:features` and `npm run dev:monitor` are shortcuts for the dev
servers (ports 8080 and 8081 respectively).

## Publishing

Build artifacts are written to the package root
(`packages/features/eruda-features.js`, `packages/monitor/eruda-monitor.js`) and are
git-ignored.

Publishing is a manual action: dispatch the `Publish to NPM` workflow and pick the
plugin to publish with the `package` input.

| Input | Publishes |
| --- | --- |
| `features` | `eruda-features` |
| `monitor` | `eruda-monitor` |

Only the selected plugin is built and published. The `NPM_TOKEN` secret is required.

## License

[MIT](./LICENSE)
