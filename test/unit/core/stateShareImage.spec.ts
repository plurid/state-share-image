import { stateShareImage } from '../../../src/ts/source/core/stateShareImage';

import { defaultBaseImageEncodedWithTestState } from './imagesData';



describe('core > stateShareImage<object>', () => {
    let testState = {
        app: {
            theme: 'night',
            multiByteChars: 'ăîșțâ€êé☻☃⁜𩸽𠜱👦✌️'
        }
    }

    // stateShareImage.encode();
    describe('stateShareImage.encode(stateObject)', () => {
        test('should return a base64 image source data string', () => {
            const result = stateShareImage.encode(testState);

            expect(result).toMatch(/data:image\/png;base64/);
        });
    });

    describe('stateShareImage.encode()', () => {
        test('should encode the defaultBaseImage with the testState object and return base64 image source data string', () => {
            const result = stateShareImage.encode(testState);

            expect(result).toEqual(defaultBaseImageEncodedWithTestState);
        });
    });


    // stateShareImage.decode();
    // describe('stateShareImage.decode()', () => {
    //     test('should decode state object from image', () => {
    //         const result = stateShareImage.decode();

    //         expect(result).toEqual('');
    //     });
    // });
});
