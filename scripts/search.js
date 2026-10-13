export function compileRegex(input, caseInsensitive) {
    if (!input) return null;
    try {
        return new RegExp(input, caseInsensitive ? "i" : "");
    } catch {
        return null;
    }
}