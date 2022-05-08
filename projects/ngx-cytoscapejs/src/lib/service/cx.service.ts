import { Injectable } from '@angular/core';
import { CytoscapeOptions } from 'cytoscape';
// @ts-ignore
import { convert } from '@js4cytoscape/cx-viz-converter';
// @ts-ignore
import { CyNetworkUtils, CxToJs } from 'cytoscape-cx2js';
import { CxConverter } from '../enum/cx-converter.enum';

@Injectable({
  providedIn: 'root',
})
export class CxService {
  convert(cxData: any, converters: CxConverter[]): CytoscapeOptions | null {
    if (cxData && converters) {
      for (let i = 0; i < converters.length; i += 1) {
        let cytoscapeOptions: CytoscapeOptions | null = null;

        switch (converters[i]) {
          case CxConverter.cx2js:
            cytoscapeOptions = this.convertWithCx2JS(cxData);
            break;
          case CxConverter.cxVizConverter:
            cytoscapeOptions = this.convertWithCxVizConverter(cxData);
            break;
          default:
            break;
        }

        if (cytoscapeOptions) {
          return cytoscapeOptions;
        }
      }
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  private convertWithCx2JS(cxData: any): CytoscapeOptions | null {
    let options: CytoscapeOptions | null = null;

    try {
      const utils = new CyNetworkUtils();
      const niceCX = utils.rawCXtoNiceCX(cxData);
      const cx2Js = new CxToJs(utils);
      const attributeNameMap = {};
      const elements = cx2Js.cyElementsFromNiceCX(niceCX, attributeNameMap);
      const style = cx2Js.cyStyleFromNiceCX(niceCX, attributeNameMap);
      const layout = cx2Js.getDefaultLayout();
      const zoom = cx2Js.cyZoomFromNiceCX(niceCX);
      const pan = cx2Js.cyPanFromNiceCX(niceCX);

      options = { elements, style, layout, zoom, pan };
    } catch (error) {
      console.error(error);
    }

    return options;
  }

  // eslint-disable-next-line class-methods-use-this
  private convertWithCxVizConverter(cxData: any): CytoscapeOptions | null {
    let options: CytoscapeOptions | null = null;

    try {
      options = convert(cxData, 'cytoscapeJS');
    } catch (error) {
      console.error(error);
    }

    return options;
  }
}
