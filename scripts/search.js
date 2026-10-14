//Turns the text of the user into a regex, with the i flag when the checkbox is on. It returns null for empty input or a pattern that won't compile, so the caller shows everything instead of crashing.
export function compileRegex(input, caseInsensitive) {
    if (!input) return null;
    try {
        return new RegExp(input, caseInsensitive ? "i" : "");
    } catch {
        return null;
    }
}