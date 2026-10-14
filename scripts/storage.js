//Save stores the records list in localStorage as JSON text under one key.
export function save(list) {
    localStorage.setItem("finance:records", JSON.stringify(list));
}
//Load reads it back and parses it; returns an empty list if nothing has been saved yet.
export function load() {
    return JSON.parse(localStorage.getItem("finance:records") || "[]");
}