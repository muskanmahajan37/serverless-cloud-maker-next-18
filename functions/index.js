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

// assemple all of the functions built in this director into a single export

// simple functions
const copyImage = require('./copy')
const convertRasterFormat = require('./convertRasterFormat')
// basic transformations
const transformApplyResize = require('./resize')
const transformApplyRotate = require('./rotate')
const transformApplyReflect = require('./reflect')
const transformApplyFilter = require('./filter')
const transformApplyBorder = require('./border')
const transformApplyBlur = require('./blur')
// vision transformations
const transformApplyCaption = require('./caption')
const transformApplyBlurFaces = require('./faces')
const transformApplyCropShape = require('./shape')
const transformApplySafeSearch = require('./safe')

module.exports = {
	// basic functions
    copyImage,
    convertRasterFormat,
    // basic transformations
    transformApplyResize,
    transformApplyRotate,
    transformApplyReflect,
    transformApplyFilter,
    transformApplyBorder,
    transformApplyBlur,
    // vision transformations
    transformApplyCaption,
    transformApplyBlurFaces,
    transformApplyCropShape,
    transformApplySafeSearch,
}
