export function trim(string: string): string {
    let targetString = string.replaceAll('/', '_')
    targetString = targetString.replaceAll('+', '-')
    return targetString
}
