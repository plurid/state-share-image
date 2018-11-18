import { convert } from '../../../src/ts/source/core/convert';



describe("Convert", () => {
    test("should convert 'A' to '0000000001000001'", () => {
        const testValue = 'A';

        const result = convert.toBinary(testValue);

        expect(result).toEqual('0000000001000001');
    });
});
