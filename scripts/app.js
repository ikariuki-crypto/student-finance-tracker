import { isValidAmount, isValidDescription, isValidDate, isValidCategory, hasNoDuplicateWords} from "./validators.js";
import { save, load } from "./storage.js";
import { compileRegex } from "./search.js";

const caseBox = document.querySelector("#case-insensitive");
const searchInput = document.querySelector("#search");
const form = document.querySelector("#record-form");
const tbody = document.querySelector("#records-body");
let records = load();
render(records);
updateStats();
function updateStats() {
    document.querySelector("#stat-count").textContent = records.length;
    const total = records.reduce((sum, r) => sum + r.amount, 0);
    document.querySelector("#stat-total").textContent = total.toFixed(2);
}

function applySearch() {
    const re = compileRegex(searchInput.value, caseBox.checked);
    const shown = re ? records.filter(r => re.test(r.description)) : records;
    render(shown, re);
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function render(list, re) {
    tbody.innerHTML = "";
    for (const rec of list) {
        const tr = document.createElement("tr");
        for (const value of [rec.date, rec.description, rec.category, rec.amount]) {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        }
    if (re) {
        tr.children[1].innerHTML = escapeHtml(rec.description).replace(re, m => `<mark>${m}</mark>`);
    }
        tbody.appendChild(tr);
    }
}

searchInput.addEventListener("input", applySearch);
caseBox.addEventListener("change", applySearch);

document.querySelector("#sort-amount").addEventListener("click", () => {
    records.sort((a, b) => a.amount - b.amount);
    applySearch();
})

document.querySelector("#sort-date").addEventListener("click",() => {
    records.sort((a, b) => a.date.localeCompare(b.date));
    applySearch();
})

document.querySelector("#sort-desc").addEventListener("click", () => {
    records.sort((a, b) => a.description.localeCompare(b.description));
    applySearch();
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;
    const description = document.querySelector("#description").value;
    const descError = document.querySelector("#description-error");
    descError.textContent = "";
    if (!isValidDescription(description)) {
        descError.textContent = "No leading or trailing spaces.";
        valid = false;
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
save(records);
updateStats();
render(records);
    document.querySelector("#status").textContent = "Record is valid"
}
})