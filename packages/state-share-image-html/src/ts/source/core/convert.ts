interface IConvert {
    charToBinary(character: string): string;
    numToBinary(number: number): string;

    charFromBinary(binary: string): string;
    numFromBinary(binary: string): number;

    /**
     * binary: string gives padStart error from TypeScript
     */
    zeroPad(binary: any): string;
}



export const convert: IConvert = {
    /**
     * Converts a given character to a binary string and pads it with 0 (32 bits).
     * e.g., 'A' to '00000000000000000000000001000001'
     *
     * @param character
     */
    charToBinary(character) {
        return convert.zeroPad(character.codePointAt(0).toString(2));
    },
     /**
     * Converts a given number to a binary string and pads it with 0 (32 bits).
     * e.g., 1 to '00000000000000000000000000000001'
     *
     * @param number
     */
    numToBinary(number) {
        return convert.zeroPad(number.toString(2));
    },


    /**
     * Converts from binary string to string character.
     * e.g., '00000000000000000000000001000001' to 'A'
     *
     * @param binary
     */
    charFromBinary(binary) {
        return String.fromCodePoint(parseInt(binary, 2));
    },
    /**
     * Converts from binary string to number.
     * e.g., '00000000111101000010010000000000' to 16000000
     *
     * @param binary
     */
    numFromBinary(binary) {
        return parseInt(binary, 2);
    },


     /**
     * Pads string with 0 (32 bits).
     * e.g., '10000000000000001' to '00000000000000010000000000000001'
     *
     * @param binary
     */
    zeroPad(binary) {
        return binary.padStart(32, '0');
    }
};
