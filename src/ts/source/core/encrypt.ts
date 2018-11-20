export function stateEncrypt(stateString, publicKey) {

    return stateString + publicKey;
}
