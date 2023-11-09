<h1 align="center">ngx-cytoscapejs</h1>

<p align="center">
  <a href="https://9von10.github.io/ngx-cytoscapejs/">Documentation</a>
  ·
  <a href="https://9von10.github.io/ngx-cytoscapejs/demo-app/">Demo</a>
</p>

This library is a wrapper for [Cytoscape.js](https://js.cytoscape.org/) to be used from any Angular 13+ application.

- Rendering of [Cytoscape.js](https://js.cytoscape.org/) and [CX](https://home.ndexbio.org/data-model/) graphs
- Automatic rerendering on graph data changes
- Automatic graph size adjustment on window resize

## Table of contents

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Getting help](#getting-help)
- [Roadmap](#roadmap)
- [License](#license)
- [Credits and references](#credits-and-references)

## Dependencies

ngx-cytoscapejs depends on [Angular](https://angular.io/), [Cytoscape.js](https://js.cytoscape.org/), [cx2js](https://github.com/cytoscape/cx2js) and [cxVizConverter](https://github.com/cytoscape/cx-viz-converter).

| ngx-cytoscapejs | Angular | Cytoscape.js | ng-add        |
| --------------- | ------- | ------------ | ------------- |
| 0.3.x           | 13.x    | 3.x          | not supported |
| 1.0.x           | 13.x    | 3.x          | not supported |
| 1.1.x           | 13.x    | 3.x          | not supported |
| 1.2.x           | 13.x    | 3.x          | not supported |
| 1.3.x           | 13.x    | 3.x          | supported     |
| 1.4.x           | 14.x    | 3.x          | supported     |
| 1.5.x           | 15.x    | 3.x          | supported     |

## Installation

Using the [Angular CLI](https://angular.io/cli) is recommended:

```shell
ng add ngx-cytoscapejs
```

### Manual installation

Add dependencies from npm.

```shell
npm install --save-dev @types/cytoscape
npm install --save ngx-cytoscapejs
```

Then import the CytoscapejsModule and add it to your module:

```tsx
import { NgModule } from '@angular/core';
import { CytoscapejsModule } from 'ngx-cytoscapejs';

@NgModule({
  declarations: [...],
  imports: [CytoscapejsModule],
  providers: [...],
  bootstrap: [...],
})
export class AppModule {}
```

## Usage

Add the cytoscapejs directive to your component's HTML:

```html
<cytoscapejs
  [cytoscapeOptions]="cytoscapeOptions"
  [autoFit]="autoFit"
  (coreChanged)="coreChanged($event)"
></cytoscapejs>
```

Configure the directive in your component:

```tsx
import { Core, CytoscapeOptions } from 'cytoscape';
import { CxConverter } from 'ngx-cytoscapejs';

export class AppComponent {
  cytoscapeOptions: CytoscapeOptions = {...};

  autoFit: boolean = true;

  coreChanged(core: Core): void {
    // do something with the core
  }
}
```

The component will take up 100% of the parent's height and width.

## API

For a graph to render you have to provide either `cytoscapeOptions` or `cxData`. The remaining inputs are optional.

### Inputs

| Name                     | Type             | Default                 | Description                                                                                                                                                                                      |
| ------------------------ | ---------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `cytoscapeOptions`       | CytoscapeOptions |                         | Your Cytoscape graph data. You don't have to provide the container property as it will be overwritten with the component's referenced DOM element.                                               |
| `autoFit`                | boolean          | true                    | When set to true the graph will be fit every time the browser window is resized.                                                                                                                 |
| `applyCxBackgroundColor` | boolean          | false                   | When set to true, the background color specified in the CX1 file will be applied to the visualization.                                                                                           |
| `cxData`                 | any              |                         | Your CX graph data. The data is converted using the the converters provided in the `cxConverters` input.                                                                                         |
| `cxConverters`           | CxConverter[]    | [cx2js, cxVizConverter] | Allows customizing the converters used by the library to convert the CX data. The library tries to convert the input data in the given order and renders the first successful conversion result. |

### Outputs

| Name                        | Type               | Description                                                             |
| --------------------------- | ------------------ | ----------------------------------------------------------------------- |
| `coreChanged`               | Core               | Emits a Core every time a new core is created.                          |
| `cxAttributeNameMapChanged` | CxAttributeNameMap | Emits a CxAttributeNameMap every time a graph is converted using cx2js. |

### Enums

#### CxConverter

| Value          | Description                          |
| -------------- | ------------------------------------ |
| cx2js          | Use cx2js for CX conversion          |
| cxVizConverter | Use cxVizConverter for CX conversion |

### Interfaces

#### CxConversion

| Value            | Type               | Description                                                                            |
| ---------------- | ------------------ | -------------------------------------------------------------------------------------- |
| options          | CytoscapeOptions   | The CytoscapeOptions object resulting from the conversion.                             |
| attributeNameMap | CxAttributeNameMap | The attribute mapping created when converting the CX graph. This property is optional. |
| backgroundColor  | string             | The background color extracted from the CX graph. This property is optional.           |

#### CxAttributeNameMap

Properties are unknown as they depend on the converted CX graph.

## Getting help

If you have questions, concerns, bug reports, etc., please file an issue in [this repository's Issue Tracker](https://github.com/9von10/ngx-cytoscapejs/issues).

## Roadmap

- [ ] Unit tests

## License

[MIT](LICENSE)

## Credits and references

- [Cytoscape.js](https://js.cytoscape.org/)
- [ngx-cytoscape](https://github.com/calvinvette/ngx-cytoscape)
- [cytoscape-cx2js](https://github.com/cytoscape/cx2js)
- [cxVizConverter](https://github.com/cytoscape/cx-viz-converter)
