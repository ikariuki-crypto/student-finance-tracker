const AMOUNT = /^(0|[1-9]\d*)(\.\d{1,2})?$/

export function isValidAmount(value) {
    return AMOUNT.test(value);
}

const DESCRIPTION = /^\S(?:.*\S)?$/

export function isValidDescription(value) {
    return DESCRIPTION.test(value);
}

const DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

export function isValidDate(value) {
    return DATE.test(value);
}


const CATEGORY = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/

export function isValidCategory(value) {
    return CATEGORY.test(value);
}

const DUPLICATE_WORD = /\b(\w+)\s+\1\b/i;

export function hasNoDuplicateWords(value) {
    return !DUPLICATE_WORD.test(value);
}