/**
 * Converts a given character to a binary string and pads it with 0 (8 bits).
 * e.g., 'A' to '01000001'
 *
 * Note:
 * Characters spanning more than 8 bits, as is ț or ș,
 * are returned with all their bits.
 *
 * @returns {Number}
 */
export var convert = {
    toBinary(character: String) {
        return character.replace(/[\s\S]/g, (character) => {
            return convert.zeroPad(character.charCodeAt(0).toString(2));
        });
    },
    fromBinary(str: String) {
        // https://ourcodeworld.com/articles/read/380/how-to-convert-a-binary-string-into-a-readable-string-and-vice-versa-with-javascript

        str = str.replace(/\s+/g, '');

        // Pretty (correct) print binary (add a space every 16 characters)
        str = str.match(/.{1,16}/g).join(" ");

        var newBinary = str.split(" ");
        var binaryCode = [];

        for (let i = 0; i < newBinary.length; i++) {
            binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
        }

        return binaryCode.join("");
    },
    zeroPad(binary: any) {
        // binary: String gives padStart error from TypeScript
        return binary.padStart(16, '0');
    }
};
