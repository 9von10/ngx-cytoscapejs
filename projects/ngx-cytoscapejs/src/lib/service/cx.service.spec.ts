import { TestBed } from '@angular/core/testing';
import { CxService } from './cx.service';
import { CxConverter } from '../enum/cx-converter.enum';
import {
  cx2ButNotCx1ConvertibleInput,
  cx1ButNotCx2ConvertibleConvertedOutput,
  cx1ConvertibleInput,
  cx1ConvertedOutput,
  cx1ButNotCx2ConvertibleInput,
  cx2ButNotCx1ConvertibleConvertedOutput,
  cx2ConvertibleInput,
  cx2ConvertedOutput,
} from './cx.service.data.spec';

describe('CxService', () => {
  let service: CxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CxService);
  });

  test('should be created', () => {
    expect(service).toBeInstanceOf(CxService);
  });

  test.each([
    [null, null],
    [null, [CxConverter.cx2js]],
    [cx1ConvertibleInput, null],
  ])(
    'convert with null parameters should return null - %j %j',
    (cxData, converters) => {
      expect(service.convert(cxData!, converters!)).toBeNull();
    },
  );

  test.each([
    [[{ CXVersion: '2.0.0' }], [CxConverter.cx2js]],
    [[{ CXVersion: '1.0.0' }], [CxConverter.cxVizConverter]],
  ])(
    'convert with inconvertible data should return null - %j %j',
    (cxData, converters) => {
      expect(service.convert(cxData!, converters!)).toBeNull();
    },
  );

  test.each([
    [cx1ConvertibleInput, [CxConverter.cx2js], cx1ConvertedOutput],
    [cx2ConvertibleInput, [CxConverter.cxVizConverter], cx2ConvertedOutput],
  ])(
    'convert with convertible data should return valid output - %j',
    (cxData, converters, expectedOutput) => {
      expect(service.convert(cxData!, converters!)).toEqual(expectedOutput);
    },
  );

  test.each([
    [
      cx1ConvertibleInput,
      [CxConverter.cx2js, CxConverter.cxVizConverter],
      cx1ConvertedOutput,
    ],
    [
      cx2ConvertibleInput,
      [CxConverter.cxVizConverter, CxConverter.cx2js],
      cx2ConvertedOutput,
    ],
  ])(
    'convert should respect converter order - %j %j',
    (cxData, converters, expectedOutput) => {
      expect(service.convert(cxData!, converters!)).toEqual(expectedOutput);
    },
  );

  test.each([
    [
      cx1ButNotCx2ConvertibleInput,
      [CxConverter.cxVizConverter, CxConverter.cx2js],
      cx1ButNotCx2ConvertibleConvertedOutput,
    ],
    [
      cx2ButNotCx1ConvertibleInput,
      [CxConverter.cx2js, CxConverter.cxVizConverter],
      cx2ButNotCx1ConvertibleConvertedOutput,
    ],
  ])(
    'convert should iterate over all converters until first successful conversion - %j %j',
    (cxData, converters, expectedOutput) => {
      expect(service.convert(cxData!, converters!)).toEqual(expectedOutput);
    },
  );
});
