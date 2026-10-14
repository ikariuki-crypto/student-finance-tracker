//This import file connects or wires the system UI to the search, storage and validators modules.
import { isValidAmount, isValidDescription, isValidDate, isValidCategory, hasNoDuplicateWords } from "./validators.js";
import { save, load } from "./storage.js";
import { compileRegex } from "./search.js";

const caseBox = document.querySelector("#case-insensitive");
const searchInput = document.querySelector("#search");
const form = document.querySelector("#record-form");
const tbody = document.querySelector("#records-body");
let records = load();
render(records);
updateStats();

//A function that recalculates the four dashboard numbers and announces the cap via the live region, when under budget and over budget likewise.
function updateStats() {
    document.querySelector("#stat-count").textContent = records.length;
    const total = records.reduce((sum, r) => sum + r.amount, 0);
    document.querySelector("#stat-total").textContent = total.toFixed(2);
    const counts = {};
    for (const r of records) {
        counts[r.category] = (counts[r.category] || 0) + 1;
    }
    let top = "none";
    for (const cat in counts) {
        if (top === "none" || counts[cat] > counts[top]) top = cat;
    }
    document.querySelector("#stat-top").textContent = top;
    const cap = Number(document.querySelector("#cap").value) || 0;
    const remaining = cap - total;
    document.querySelector("#stat-remaining").textContent = remaining.toFixed(2);
    const status = document.querySelector("#status");
    if (cap > 0 && remaining < 0) {
        status.setAttribute("aria-live", "assertive");
        status.textContent = "Over budget by " + Math.abs(remaining).toFixed(2);
    } else if (cap > 0) {
        status.setAttribute("aria-live", "polite");
        status.textContent = "Remaining: " + remaining.toFixed(2);
    }
}

//This function builds a regex from the search box safely so the broken patterns doesn't crash then filters by description and redraws.
function applySearch() {
    const re = compileRegex(searchInput.value, caseBox.checked);
    const shown = re ? records.filter(r => re.test(r.description)) : records;
    render(shown, re);
}

//This makes the description text safe before inserting it as HTML so the <mark> highlighting can't be abused by a description that contains tags.
function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

//Render clears the table and draws one row per record with a highlighted match if a regex is active and a delete button that asks for confirmation.
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
        const actions = document.createElement("td");
        const del = document.createElement("button");
        del.type = "button";
        del.textContent = "Delete";
        del.addEventListener("click", () => {
            if (confirm("Delete this record?")) {
                records = records.filter(r => r.id !== rec.id);
                save(records);
                applySearch();
                updateStats();
                document.querySelector("#status").textContent = "Record deleted.";
            }
        });
        actions.appendChild(del);
        tr.appendChild(actions);
        tbody.appendChild(tr);
    }
}

searchInput.addEventListener("input", applySearch);
caseBox.addEventListener("change", applySearch);

document.querySelector("#sort-amount").addEventListener("click", () => {
    records.sort((a, b) => a.amount - b.amount);
    applySearch();
})

document.querySelector("#sort-date").addEventListener("click", () => {
    records.sort((a, b) => a.date.localeCompare(b.date));
    applySearch();
})

document.querySelector("#sort-desc").addEventListener("click", () => {
    records.sort((a, b) => a.description.localeCompare(b.description));
    applySearch();
})
document.querySelector("#cancel-edit").addEventListener("click", () => form.reset());
document.querySelector("#cap").addEventListener("input", updateStats);

document.querySelector("#export-btn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "finance-records.json";
    a.click();
});

// This listener reads the chosen file, parses it, and checks every record with the same validators as the form before replacing the data, so a bad file is rejected.
document.querySelector("#import-btn").addEventListener("click", () => {
    const file = document.querySelector("#import-file").files[0];
    const status = document.querySelector("#status");
    if (!file) { status.textContent = "Choose a file first."; return; }
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result);
            const ok = Array.isArray(data) && data.every(r =>
                typeof r.id === "string" &&
                isValidDescription(r.description) &&
                isValidAmount(String(r.amount)) &&
                isValidDate(r.date) &&
                isValidCategory(r.category)
            );
            if (!ok) { status.textContent = "Import rejected: invalid structure."; return; }
            records = data;
            save(records);
            render(records);
            updateStats();
            status.textContent = "Imported " + records.length + " records.";
        } catch {
            status.textContent = "Import rejected: not valid JSON.";
        }
    };
    reader.readAsText(file);
});

//This listener validates all four fields, shows errors under each input, and only then creates the record, saves, and updates the UI.
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
        document.querySelector("#status").textContent = "Record added"; form.reset();
    }
})