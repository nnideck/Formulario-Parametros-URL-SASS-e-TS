import { Ideparts, Iuser } from "./types";

const divDeparts = document.querySelector(".departs");
const submitButton = document.querySelector(".sub_button");
const form = document.querySelector("form");

let departs: Ideparts[] = [];
let formInputs: boolean = false;

const objForm = {
  names: true,
  surname: true,
  email: true,
  birth: true,
};

async function fillDeparts() {
  const resp = await fetch("http://127.0.0.1:3500/departamentos");
  const departList = await resp.json();
  departs = departList;
  departs.forEach((depart) => {
    const div = document.createElement("div");
    div.classList.add("col-sm-10");
    div.innerHTML = `<div class ="mb-2">
    <input class="form-check-input" type="checkbox" id=${depart.id} />
    <label class="form-check-label" for=${depart.id}> ${depart.nome} </label>
   </div>`;
    divDeparts?.appendChild(div);
  });
}
fillDeparts();

function showErrorMessage(input: HTMLInputElement, msg: string) {
  const inputDiv = input.parentNode;
  inputDiv!.querySelector("small")!.textContent = msg;
}

function validateRequired(input: HTMLInputElement) {
  if (!input.value || input.value.length === 0 || input.value.trim() === "") {
    return false;
  }
  return true;
}

function validateMinLength(input: HTMLInputElement) {
  if (input.value.length >= 3) {
    return true;
  } else {
    return false;
  }
}

function validateName(name: HTMLInputElement) {
  if (validateRequired(name)) {
    if (validateMinLength(name)) {
      showErrorMessage(name, "");
      objForm.names = true;
      return true;
    } else {
      showErrorMessage(name, "Name must be at least 3 characters long");
      objForm.names = false;
      return false;
    }
  } else {
    showErrorMessage(name, "Name required");
    objForm.names = false;
    return false;
  }
}

function validateSurname(surname: HTMLInputElement) {
  if (surname) {
    if (validateRequired(surname)) {
      showErrorMessage(surname, "");
      objForm.surname = true;
      return true;
    } else {
      showErrorMessage(surname, "Surname required");
      objForm.surname = false;
      return false;
    }
  }
}

function validateEmail(email: HTMLInputElement) {
  if (email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email.value)) {
      showErrorMessage(email, "");
      objForm.email = true;
      return true;
    } else {
      showErrorMessage(email, "Email required");
      objForm.email = false;
      return false;
    }
  }
}

function validateDate(birth: HTMLInputElement) {
  if (birth.value) {
    const today = new Date();
    const userBirth = new Date(birth.value);
    if (userBirth.getTime() > today.getTime()) {
      showErrorMessage(
        birth,
        "Date of birth needs to be before the current date"
      );
      objForm.birth = false;
    } else {
      showErrorMessage(birth, "");
      objForm.birth = true;
    }
  } else {
    showErrorMessage(birth, "Date of birth required");
    objForm.birth = false;
  }
}

function validateForm() {
  const { names, surname, email, birth } = form!;

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
  submitButton?.addEventListener("click", handleSubmit);
}

if (form) {
  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    return false;
  });
}

console.log(objForm.names, objForm.surname);
