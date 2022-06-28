/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { CytoscapeOptions } from 'cytoscape';
// @ts-ignore
import { convert } from '@js4cytoscape/cx-viz-converter';
// @ts-ignore
import { CyNetworkUtils, CxToJs } from 'cytoscape-cx2js';
import { CxConverter } from '../enum/cx-converter.enum';
import { CxConversion } from '../interface/cx-conversion.interface';

/**
 * This service handles the conversion from CX to Cytoscape.js graphs.
 */
@Injectable({
  providedIn: 'root',
})
export class CxService {
  /**
   * Tries to convert the incoming CX object into CytoscapeOptions using the list of {@link CxConverter}s in sequence.
   *
   * @param {any} cxData CX object
   * @param {CxConverter[]} converters List of {@link CxConverter}s
   * @returns {CxConversion | null} On success the resulting CxConversion object is returned, otherwise null is returned.
   */
  convert(cxData: any, converters: CxConverter[]): CxConversion | null {
    if (cxData && converters) {
      for (let i = 0; i < converters.length; i += 1) {
        let conversion: CxConversion | null = null;

        switch (converters[i]) {
          case CxConverter.cx2js:
            conversion = this.convertWithCx2JS(cxData);
            break;
          case CxConverter.cxVizConverter:
            conversion = this.convertWithCxVizConverter(cxData);
            break;
          default:
            break;
        }

        if (conversion) {
          return conversion;
        }
      }
    }

    return null;
  }

  /**
   * Tries to convert the input CX object using [cx2js]{@link https://github.com/cytoscape/cx2js}.
   *
   * @param {any} cxData CX object
   * @returns {CxConversion | null} On success the converted CytoscapeOptions object as well as the attributeNameMap object is returned, otherwise null is returned.
   */
  private convertWithCx2JS(cxData: any): CxConversion | null {
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
      const backgroundColor: string = cx2Js.cyBackgroundColorFromNiceCX(niceCX);

      const options: CytoscapeOptions = { elements, style, layout, zoom, pan };
      const conversion: CxConversion = { options, attributeNameMap, backgroundColor };

      return conversion;
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  /**
   * Tries to convert the input CX object using [cx-viz-converter]{@link https://github.com/cytoscape/cx-viz-converter}.
   *
   * @param {any} cxData CX object
   * @returns {CytoscapeOptions | null} On success the converted CytoscapeOptions object is returned, otherwise null is returned.
   */
  private convertWithCxVizConverter(cxData: any): CxConversion | null {
    try {
      const options: CytoscapeOptions = convert(cxData, 'cytoscapeJS');
      const conversion: CxConversion = { options };

      return conversion;
    } catch (error) {
      console.error(error);
    }

    return null;
  }
}
