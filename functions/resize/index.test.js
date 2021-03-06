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
const resizeTransform = require('./index.js');

jest.mock('../helpers.js');
const helpers = require('../helpers');

const inFile = 'inFile';
const outFile = 'outFile';

describe('when resizeTransform is called', () => {
    it('should call resolveImageMagickConvert', () => {
        resizeTransform.applyResize(
            inFile,
            outFile,
            {width: 1, height: 1}
        );
        expect(helpers.resolveImageMagickConvert).toHaveBeenCalledWith([
            inFile,
            '-resize',
            '1x1!',
            outFile,
        ]);
    });

    it('should have default parameters', () => {
        expect(resizeTransform.parameters).not.toBeUndefined();
    });
    it('should reject non-numeric inputs', () => {
        expect(resizeTransform.parameters.width.validate('1234'))
            .toBe(true);
        expect(resizeTransform.parameters.height.validate('1234'))
            .toBe(true);
        expect(resizeTransform.parameters.width.validate(1234))
            .toBe(true);
        expect(resizeTransform.parameters.height.validate(4321))
            .toBe(true);
        expect(resizeTransform.parameters.width.validate('asdf'))
            .toBe(false);
        expect(resizeTransform.parameters.width.validate('fdsa'))
            .toBe(false);
    });
});
