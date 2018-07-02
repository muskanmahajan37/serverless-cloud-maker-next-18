// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const transformApplyBorder = require('./index.js')

jest.mock('../helpers.js')
const helpers = require('../helpers')

// placeholder file names
const inFile = 'inFile'
const outFile = 'outFile'
const color = 'blue'
const width = 10

describe('when transformApplyBorder is called', () => {
  // it sould accept google colors
  ['blue', 'green', 'yellow', 'red'].map((color) =>

    it(`it should accept ${color}`, () => {
      expect(transformApplyBorder.parameters.color.validate(color)).toBe(true)
        })
  );

  // it sould not accept non-google colors
  ['magenta', 'false', 'goldenrod', '0'].map((color) =>

    it(`it should not accept ${color}`, () => {
      expect(transformApplyBorder.parameters.color.validate(color)).toBe(false)
        })
  );

  [10, '20', 30.0].map((width) =>
    it(`should accept ${width}`, () => {
      expect(transformApplyBorder.parameters.width.validate(width)).toBe(true)
    })
  );

  [200, 'foo', 30.01].map((width) =>
    it(`should not accept ${width}`, () => {
      expect(transformApplyBorder.parameters.width.validate(width)).toBe(false)
    })
  );

  it('should call resolveImageMagickConvert', () => {
    transformApplyBorder.applyBorder(inFile, outFile, {width, color})
    expect(helpers.resolveImageMagickConvert)
      .toHaveBeenCalledWith([
        inFile,
        '-bordercolor',
        'blue',
        '-border',
        '10%x10%',
        outFile])
  });
});

/*
An example request

{
  "data": {
    "gcsSourceUri": "gs://cloud-maker-inputs-small/00c923c9108d34149536bfedab12f91e_1016760185400008708_503820455.jpg",
    "bucket": "cloud-maker-inputs-small",
    "name": "00c923c9108d34149536bfedab12f91e_1016760185400008708_503820455.jpg"
  },
  "outpubBucketName": "cloud-maker-outputs-final",
  "functions": [
    { "name": "transformApplyBlur"}
  ]
}
 */
