export function stateDecrypt(encryptedString:string, privateKey: string): string {

    return encryptedString + privateKey;
}
