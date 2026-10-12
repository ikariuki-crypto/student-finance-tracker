import { isValidAmount, isValidDescription, isValidDate, isValidCategory, hasNoDuplicateWords} from "./validators.js";

const form = document.querySelector("#record-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;
    const description = document.querySelector("#description").value;
    const descError = document.querySelector("#description-error");
    descError.textContent = "";
    if (!isValidDescription(description)) {
        descError.textContent = "No leading or trailing spaces.";
        Valid = false;
    }
    if (!hasNoDuplicateWords(description)) {
        descError.textContent = "Found duplicate word! try again...";
        valid = false;
    }
    const amount = document.querySelector("#amount").value;
    const amtError = document.querySelector("#amount-error");
    amtError.textContent = "";
    if (!isValidAmount(amount)) {
        amtError.textContent = "Must be a number with up to 2 decimals.";
        valid = false;
    }
    const date = document.querySelector("#date").value;
    const dateError = document.querySelector("#date-error");
    dateError.textContent = "";
    if (!isValidDate(date)) {
        dateError.textContent = "Wrong format, use YYYY-MM-DD.";
        valid = false;
    }
    const category = document.querySelector("#category").value;
    const catError = document.querySelector("#category-error");
    catError.textContent = "";
    if (!isValidCategory(category)) {
        catError.textContent = "Invalid category, please choose again.";
        valid = false;
    }
if (valid) {
    document.querySelector("#status").textContent = "Record is valid"
}
})