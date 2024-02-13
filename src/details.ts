import { Ideparts, Iuser } from "./types";

const modal = document.querySelector(".box_2") as HTMLDialogElement;

const img = document.querySelector(".card-img-top");
const cardTitle = document.querySelector(".card-title");
const cardText = document.querySelector(".card-text");

const value = window.location.search;
const searchParams = new URLSearchParams(value);
let departs: Ideparts[] = [];
let userDetails: Iuser;
let interestsList: string[] = [];

let urlId: number = 0;

function closeModal() {
  const button = document.querySelector(
    ".btn_modal_cancel"
  ) as HTMLButtonElement;
  button.onclick = () => {
    modal.close();
  };
}
closeModal();

if (searchParams.has("id")) {
  const id = parseInt(searchParams.get("id")!);
  getUser(id);
  urlId = id;
}

function showModalOnClick() {
  let modalText = document.querySelector(".modal-body");
  modalText!.textContent = `Are you sure you want to delete ${userDetails.nome} ${userDetails.sobrenome}?`;
  modal.showModal();
}

const deleteBtn = document.querySelector(".btn-dlt") as HTMLButtonElement;
if (deleteBtn) {
  deleteBtn.onclick = () => {
    showModalOnClick();
  };
}

async function fullfilInterests(param: number[]) {
  if (param) {
    const resp = await fetch("http://127.0.0.1:3500/departamentos");
    const departList = await resp.json();
    departs = departList;

    departs.forEach((depart) => {
      for (const item in param) {
        if (param[item] === depart.id) {
          const interest = depart.nome;
          interestsList.push(` ${interest}`);
        }
      }
    });
  }
}

async function getUser(id: number) {
  const details = await fetch(`http://127.0.0.1:3500/usuarios/${id}`);
  const userDetail = await details.json();
  userDetails = userDetail;
  if (id === userDetail.id) {
    cardTitle!.innerHTML = `${userDetail.nome} ${userDetail.sobrenome}`;
    img?.setAttribute("src", `${userDetail.foto}`);
    await fullfilInterests(userDetail.interesses);
    for (const item in userDetail) {
      if (userDetail[item] === userDetail.interesses) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<b>${item}:</b> ${interestsList}`;
        cardText?.appendChild(tr);
      } else {
        const tr = document.createElement("tr");
        tr.innerHTML = `<b>${item}:</b> ${userDetail[item]}`;
        cardText?.appendChild(tr);
      }
    }
  }
}
