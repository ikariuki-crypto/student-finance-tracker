import { isValidAmount, isValidDescription, isValidDate, isValidCategory, hasNoDuplicateWords} from "./validators.js";

const form = document.querySelector("#record-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submitted");
});