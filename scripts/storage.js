export function save(list) {
    localStorage.setItem("finance:records", JSON.stringify(list));
}
export function load() {
    return JSON.parse(localStorage.getItem("finance:records") || "[]");
}