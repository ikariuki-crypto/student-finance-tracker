//A whole number without any leading zeros, a isngle 0 is allowed, a dot and one or two decimlas optionally, it rejects 007 and 1.500
const AMOUNT = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

export function isValidAmount(value) {
    return AMOUNT.test(value);
}
//The first and last characters must be non-space, anything in between; rejects leading or trailing spaces.
const DESCRIPTION = /^\S(?:.*\S)?$/;

export function isValidDescription(value) {
    return DESCRIPTION.test(value);
}
//Four didgits, a dash, months from 01-12, another dash and day from 01-31. Does not check that the day exists for that month.
const DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function isValidDate(value) {
    return DATE.test(value);
}
//One or more words made of letters, separated by a single space or hyphen, it rejects digits abd symbols.
const CATEGORY = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

export function isValidCategory(value) {
    return CATEGORY.test(value);
}
//(\w+) captures a WORD AND \1 is a back-reference that must match the smae word agian after whitespace, the i flag makes "The the " count. The function is inverted so true means no dplicate.
const DUPLICATE_WORD = /\b(\w+)\s+\1\b/i;

export function hasNoDuplicateWords(value) {
    return !DUPLICATE_WORD.test(value);
}