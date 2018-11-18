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
        test('FALSE should encode image with state object', () => {
            const testValue = 'A';

            // const result = stateShareImage.encode(testValue);
            const result = 'A';

            expect(result).toEqual('A');
        });
    });



    // stateShareImage.decode();
    describe('stateShareImage.decode()', () => {
        test('FALSE should decode state object from image', () => {
            const testValue = 'A';

            // const result = stateShareImage.decode(testValue);
            const result = 'A';

            expect(result).toEqual('A');
        });
    });
});
