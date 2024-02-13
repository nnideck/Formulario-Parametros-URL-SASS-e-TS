var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const divDeparts = document.querySelector(".departs");
const submitButton = document.querySelector(".sub_button");
const form = document.querySelector("form");
let departs = [];
let formInputs = false;
const objForm = {
    names: true,
    surname: true,
    email: true,
    birth: true,
};
function fillDeparts() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://127.0.0.1:3500/departamentos");
        const departList = yield resp.json();
        departs = departList;
        departs.forEach((depart) => {
            const div = document.createElement("div");
            div.classList.add("col-sm-10");
            div.innerHTML = `<div class ="mb-2">
    <input class="form-check-input" type="checkbox" id=${depart.id} />
    <label class="form-check-label" for=${depart.id}> ${depart.nome} </label>
   </div>`;
            divDeparts === null || divDeparts === void 0 ? void 0 : divDeparts.appendChild(div);
        });
    });
}
fillDeparts();
function showErrorMessage(input, msg) {
    const inputDiv = input.parentNode;
    inputDiv.querySelector("small").textContent = msg;
}
function validateRequired(input) {
    if (!input.value || input.value.length === 0 || input.value.trim() === "") {
        return false;
    }
    return true;
}
function validateMinLength(input) {
    if (input.value.length >= 3) {
        return true;
    }
    else {
        return false;
    }
}
function validateName(name) {
    if (validateRequired(name)) {
        if (validateMinLength(name)) {
            showErrorMessage(name, "");
            objForm.names = true;
            return true;
        }
        else {
            showErrorMessage(name, "Name must be at least 3 characters long");
            objForm.names = false;
            return false;
        }
    }
    else {
        showErrorMessage(name, "Name required");
        objForm.names = false;
        return false;
    }
}
function validateSurname(surname) {
    if (surname) {
        if (validateRequired(surname)) {
            showErrorMessage(surname, "");
            objForm.surname = true;
            return true;
        }
        else {
            showErrorMessage(surname, "Surname required");
            objForm.surname = false;
            return false;
        }
    }
}
function validateEmail(email) {
    if (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email.value)) {
            showErrorMessage(email, "");
            objForm.email = true;
            return true;
        }
        else {
            showErrorMessage(email, "Email required");
            objForm.email = false;
            return false;
        }
    }
}
function validateDate(birth) {
    if (birth.value) {
        const today = new Date();
        const userBirth = new Date(birth.value);
        if (userBirth.getTime() > today.getTime()) {
            showErrorMessage(birth, "Date of birth needs to be before the current date");
            objForm.birth = false;
        }
        else {
            showErrorMessage(birth, "");
            objForm.birth = true;
        }
    }
    else {
        showErrorMessage(birth, "Date of birth required");
        objForm.birth = false;
    }
}
function validateForm() {
    const { names, surname, email, birth } = form;
    names.onkeyup = () => validateName(names);
    validateName(names);
    surname.onkeyup = () => validateSurname(surname);
    validateSurname(surname);
    email.onkeyup = () => validateEmail(email);
    validateEmail(email);
    birth.onchange = () => validateDate(birth);
    validateDate(birth);
    console.log(objForm.names, objForm.surname, objForm.email, objForm.birth);
}
function handleSubmit() {
    formInputs = true;
    validateForm();
}
if (submitButton) {
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", handleSubmit);
}
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        return false;
    });
}
console.log(objForm.names, objForm.surname);
export {};
