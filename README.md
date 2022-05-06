# ngx-cytoscapejs

This library is a wrapper for [Cytoscape.js](https://js.cytoscape.org/) to be used from any Angular 13+ application.

## Table of contents

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Getting help](#getting-help)
- [Roadmap](#roadmap)
- [License](#license)
- [Credits and references](#credits-and-references)

## Dependencies

ngx-cytoscapejs depends on [Angular](https://angular.io/) and [Cytoscape.js](https://js.cytoscape.org/).

| ngx-cytoscapejs | Angular | Cytoscape.js |
| --------------- | ------- | ------------ |
| 0.1.0           | 13.x.x  | 3.x.x        |

## Installation

```shell
npm install --save git+https://github.com/9von10/ngx-cytoscapejs.git
```

## Usage

Import the CytoscapejsModule and add it to your module:

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

Add the cytoscapejs directive to your HTML:

```html
<cytoscapejs [cyOptions]="cyOptions"></cytoscapejs>
```

## Getting help

If you have questions, concerns, bug reports, etc., please file an issue in [this repository's Issue Tracker](https://github.com/9von10/ngx-cytoscapejs/issues).

## Roadmap

- [x] Render [Cytoscape.js](https://js.cytoscape.org/) object
- [ ] Option to fit graph on window resize
- [ ] Render [CX](https://home.ndexbio.org/data-model/) object
- [ ] Unit tests
- [ ] Documentation
- [ ] Publish NPM package
- [ ] Angular CLI schematics

## License

[MIT](LICENSE)

## Credits and references

- [Cytoscape.js](https://js.cytoscape.org/)
- [ngx-cytoscape](https://github.com/calvinvette/ngx-cytoscape)
