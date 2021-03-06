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
const landmarkTransform = require('./index.js');

jest.mock('../caption');
const captionTransform = require('../caption');


jest.mock('@google-cloud/vision');
const VisionApi = require('@google-cloud/vision').v1p2beta1;

const file = {
    bucket: {name: 'foo'},
    name: 'bar.png',
};

const mockDetection = VisionApi
    .ImageAnnotatorClient
    .prototype
    .landmarkDetection;

describe('when landmarkTransform is called', () => {
  it('should have default parameters', () => {
    expect(landmarkTransform.parameters).not.toBeUndefined();
  });

  it('should create a caption if a landmark is detected', () => {
    captionTransform.mockClear();
    captionTransform.mockReturnValue(Promise.resolve());
        mockDetection
            .mockClear();

        mockDetection
            .mockReturnValue(Promise.resolve(
                [{
                    landmarkAnnotations: [
                        {description: 'bestAnnotation', score: 1},
                        {description: 'worstAnnotation', score: 0},
                    ],
                }]
            ));
        return landmarkTransform(file, {})
            .then(() =>
                expect(captionTransform)
                    .toHaveBeenCalledWith(file, {caption: 'bestAnnotation'})
            );
  });

  it('should not create a caption if none are detected', () => {
    captionTransform.mockClear();
    captionTransform.mockReturnValue(Promise.resolve());
        mockDetection
            .mockClear();

        mockDetection
            .mockReturnValue(Promise.resolve(
                [{
                    landmarkAnnotations: [],
                }]
            ));
        return landmarkTransform(file, {})
            .then(() =>
                expect(captionTransform)
                    .toHaveBeenCalledWith(file, {caption: 'No landmark found.'})
            );
  });
});


describe('detectLandmark', () => {
    it('should call landmarkDetection with a GCS url', () => {
        mockDetection
            .mockClear();

        mockDetection
            .mockReturnValue(Promise.resolve(
                [{
                    landmarkAnnotations: [
                        {description: 'bestAnnotation', score: 1},
                        {description: 'worstAnnotation', score: 0},
                    ],
                }]
            ));
        return landmarkTransform
            .detectLandmark(file)
            .then(({description}) => {
                expect(mockDetection)
                    .toHaveBeenCalledWith('gs://foo/bar.png');
                expect(description).toEqual('bestAnnotation');
            });
    });
});
