import { stateShareImage } from '../../../src/ts/source/core/stateShareImage';

import { defaultBaseImageEncodedWithTestState } from './imagesData';



describe('core > stateShareImage<object>', () => {
    const testState = {
        app: {
            theme: 'night',
            multiByteChars: 'ăîșțâ€êé☻☃⁜𩸽𠜱👦✌️'
        }
    }

    // stateShareImage.encode();
    describe('stateShareImage.encode(stateObject)', () => {
        test('should resolve to a base64 image source data string', () => {
            const result = stateShareImage.encode(testState);

            expect(result).resolves.toMatch(/data:image\/png;base64/);
        });
    });

    describe('stateShareImage.encode(stateObject)', () => {
        test('should encode the defaultBaseImage with the testState object and resolve to a base64 image source data string', () => {
            const result = stateShareImage.encode(testState);

            expect(result).resolves.toEqual(defaultBaseImageEncodedWithTestState);
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
