import { convert } from '../../../src/ts/source/core/convert';



describe('core > convert<object>', () => {
    // convert.toBinary();
    describe('convert.toBinary(character)', () => {
        test('should convert "A" to "00000000000000000000000001000001"', () => {
            const testValue = 'A';

            const result = convert.toBinary(testValue);

            expect(result).toEqual('00000000000000000000000001000001');
        });
    });

    describe('convert.toBinary(character)', () => {
        test('should convert "ă" to "00000000000000000000000100000011"', () => {
            const testValue = 'ă';

            const result = convert.toBinary(testValue);

            expect(result).toEqual('00000000000000000000000100000011');
        });
    });

    describe('convert.toBinary(character)', () => {
        test('should convert "👦" to "00000000000000011111010001100110"', () => {
            const testValue = '👦';

            const result = convert.toBinary(testValue);

            expect(result).toEqual('00000000000000011111010001100110');
        });
    });

    describe('convert.toBinary(character)', () => {
        test('should convert "𩸽" to "00000000000000101001111000111101"', () => {
            const testValue = '𩸽';

            const result = convert.toBinary(testValue);

            expect(result).toEqual('00000000000000101001111000111101');
        });
    });



    // convert.fromBinary();
    describe('convert.fromBinary(character)', () => {
        test('should convert "00000000000000000000000001000001" to "A"', () => {
            const testValue = '00000000000000000000000001000001';

            const result = convert.fromBinary(testValue);

            expect(result).toEqual('A');
        });
    });

    describe('convert.fromBinary(character)', () => {
        test('should convert "00000000000000000000000100000011" to "ă"', () => {
            const testValue = '00000000000000000000000100000011';

            const result = convert.fromBinary(testValue);

            expect(result).toEqual('ă');
        });
    });

    describe('convert.fromBinary(character)', () => {
        test('should convert "00000000000000011111010001100110" to "👦"', () => {
            const testValue = '00000000000000011111010001100110';

            const result = convert.fromBinary(testValue);

            expect(result).toEqual('👦');
        });
    });

    describe('convert.fromBinary(character)', () => {
        test('should convert "00000000000000101001111000111101" to "𩸽"', () => {
            const testValue = '00000000000000101001111000111101';

            const result = convert.fromBinary(testValue);

            expect(result).toEqual('𩸽');
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
