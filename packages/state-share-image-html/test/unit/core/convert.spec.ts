import { convert } from '../../../src/ts/source/core/convert';



describe('core > convert<object>', () => {
    // convert.charToBinary();
    describe('convert.charToBinary(character)', () => {
        test('should convert "A" to "00000000000000000000000001000001"', () => {
            const testValue = 'A';

            const result = convert.charToBinary(testValue);

            expect(result).toEqual('00000000000000000000000001000001');
        });
    });

    describe('convert.charToBinary(character)', () => {
        test('should convert "ă" to "00000000000000000000000100000011"', () => {
            const testValue = 'ă';

            const result = convert.charToBinary(testValue);

            expect(result).toEqual('00000000000000000000000100000011');
        });
    });

    describe('convert.charToBinary(character)', () => {
        test('should convert "👦" to "00000000000000011111010001100110"', () => {
            const testValue = '👦';

            const result = convert.charToBinary(testValue);

            expect(result).toEqual('00000000000000011111010001100110');
        });
    });

    describe('convert.charToBinary(character)', () => {
        test('should convert "𩸽" to "00000000000000101001111000111101"', () => {
            const testValue = '𩸽';

            const result = convert.charToBinary(testValue);

            expect(result).toEqual('00000000000000101001111000111101');
        });
    });


    // convert.numToBinary();
    describe('convert.numToBinary(character)', () => {
        test('should convert 1 to "00000000000000000000000000000001"', () => {
            const testValue = 1;

            const result = convert.numToBinary(testValue);

            expect(result).toEqual('00000000000000000000000000000001');
        });
    });

    describe('convert.numToBinary(character)', () => {
        test('should convert 16000000 to "00000000111101000010010000000000"', () => {
            const testValue = 16000000;

            const result = convert.numToBinary(testValue);

            expect(result).toEqual('00000000111101000010010000000000');
        });
    });


    // convert.charFromBinary();
    describe('convert.charFromBinary(character)', () => {
        test('should convert "00000000000000000000000001000001" to "A"', () => {
            const testValue = '00000000000000000000000001000001';

            const result = convert.charFromBinary(testValue);

            expect(result).toEqual('A');
        });
    });

    describe('convert.charFromBinary(character)', () => {
        test('should convert "00000000000000000000000100000011" to "ă"', () => {
            const testValue = '00000000000000000000000100000011';

            const result = convert.charFromBinary(testValue);

            expect(result).toEqual('ă');
        });
    });

    describe('convert.charFromBinary(character)', () => {
        test('should convert "00000000000000011111010001100110" to "👦"', () => {
            const testValue = '00000000000000011111010001100110';

            const result = convert.charFromBinary(testValue);

            expect(result).toEqual('👦');
        });
    });

    describe('convert.charFromBinary(character)', () => {
        test('should convert "00000000000000101001111000111101" to "𩸽"', () => {
            const testValue = '00000000000000101001111000111101';

            const result = convert.charFromBinary(testValue);

            expect(result).toEqual('𩸽');
        });
    });


    // convert.numFromBinary();
    describe('convert.numFromBinary(character)', () => {
        test('should convert "00000000000000000000000000000001" to 1', () => {
            const testValue = '00000000000000000000000000000001';

            const result = convert.numFromBinary(testValue);

            expect(result).toEqual(1);
        });
    });

    describe('convert.numFromBinary(character)', () => {
        test('should convert "00000000111101000010010000000000" to 16000000', () => {
            const testValue = '00000000111101000010010000000000';

            const result = convert.numFromBinary(testValue);

            expect(result).toEqual(16000000);
        });
    });


    // convert.zeroPad();
    describe('convert.zeroPad(binary)', () => {
        test('should pad "1" with 31 zeroes, "00000000000000000000000000000001"', () => {
            const testValue = '1';

            const result = convert.zeroPad(testValue);

            expect(result).toEqual('00000000000000000000000000000001');
        });
    });

    describe('convert.zeroPad(binary)', () => {
        test('should pad "10000000000000001" with 15 zeroes, "00000000000000010000000000000001"', () => {
            const testValue = '10000000000000001';

            const result = convert.zeroPad(testValue);

            expect(result).toEqual('00000000000000010000000000000001');
        });
    });
});
