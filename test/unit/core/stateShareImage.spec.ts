import { stateShareImage } from '../../../src/ts/source/core/stateShareImage';



describe('core > stateShareImage<object>', () => {
    let testState = {
        app: {
            theme: 'night',
            multiByteChars: 'ăîșțâ€êé☻☃⁜𩸽𠜱👦✌️'
        }
    }

    // stateShareImage.encode();
    describe('stateShareImage.encode()', () => {
        test('should encode the default baseImage with the testState object', () => {
            // console.log(stateShareImage);
            const result = stateShareImage.encode(testState);
            // const result = 'A';

            expect(result).toEqual('A');
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
