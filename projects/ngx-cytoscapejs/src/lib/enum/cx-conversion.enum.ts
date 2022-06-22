import { CytoscapeOptions } from 'cytoscape';
import { CxAttributeNameMap } from './cx-attribute-name-map.enum';

export interface CxConversion {
  options: CytoscapeOptions;
  attributeNameMap?: CxAttributeNameMap;
}
