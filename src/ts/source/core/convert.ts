interface IConvert {
    toBinary(character: string);
    fromBinary(binary: string);
    zeroPad(binary: any);
}


export const convert: IConvert = {
    /**
     * Converts a given character to a binary string and pads it with 0 (16 bits).
     * e.g., 'A' to '0000000001000001'
     *
     * @param character
     */
    toBinary(character: String) {
        return character.replace(/[\s\S]/g, (character) => {
            return convert.zeroPad(character.charCodeAt(0).toString(2));
        });
    },

    /**
     * Converts from binary string to string character.
     * e.g., '0000000001000001' to 'A'
     *
     * @param binary
     */
    fromBinary(binary: string) {
        return String.fromCharCode(parseInt(binary, 2))
    },

     /**
     * Pads string with 0 (16 bits).
     * e.g., '1000001' to '0000000001000001'
     *
     * binary: string gives padStart error from TypeScript
     *
     * @param binary
     */
    zeroPad(binary: any) {
        return binary.padStart(16, '0');
    }
};
