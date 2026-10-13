import { isValidAmount, isValidDescription, isValidDate, isValidCategory, hasNoDuplicateWords} from "./validators.js";

const form = document.querySelector("#record-form");

let records = []

const tbody = document.querySelector("#records-body");

function render(list) {
    tbody.innerHTML = "";
    for (const rec of list) {
        const tr = document.createElement("tr");
        for (const value of [rec.date, rec.description, rec.category, rec.amount]) {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

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
    const record = {
    id: "rec_" + Date.now(),
    description: description,
    amount: Number(amount),
    category: category,
    date: date,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};
records.push(record);
render(records);
    document.querySelector("#status").textContent = "Record is valid"
}
})