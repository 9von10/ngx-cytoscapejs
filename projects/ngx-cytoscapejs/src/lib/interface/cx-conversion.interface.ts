import { CytoscapeOptions } from 'cytoscape';
import { CxAttributeNameMap } from './cx-attribute-name-map.interface';

export interface CxConversion {
  options: CytoscapeOptions;
  attributeNameMap?: CxAttributeNameMap;
  backgroundColor?: string;
}
