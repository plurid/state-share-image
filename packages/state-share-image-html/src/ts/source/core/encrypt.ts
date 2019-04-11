export function stateEncrypt(stateString: string, publicKey: string): string {

    return stateString + publicKey;
}
