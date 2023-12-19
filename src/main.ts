import { Idepartamentos, Iusuario } from "./types";

const tbody = document.querySelector(".tbody_list")
const modal = document.querySelector(".box_1") as HTMLDialogElement;

function closeModal () {
const button = document.querySelector(".btn_modal_cancel") as HTMLButtonElement
button.onclick = () => {
  modal.close()
}}
closeModal ()

let users: Iusuario[] = ""


async function getUsers() {
  const resp = await fetch("http://127.0.0.1:3500/usuarios")
  const usersList = await resp.json()
  users = usersList
users.forEach(user => {
  const tr = document.createElement ("tr")
  const th =          
` <td><a href="user.html?id=${user.id}"><img src="${user.foto}"></a></td>
  <td><a href="user.html?id=${user.id}">${user.nome} ${user.sobrenome}</a></td>
  <td>${user.cpf}</td> 
  <td>${user.sexo}</td>
  <td>${user.email}</td>
  <td>
  <button type="button" class="btn btn-primary btn-sm btn-edt">EDIT</button>
  <button type="button" class="btn btn-primary btn-sm btn-dlt">DELETE</button>
  </td>`
tr.innerHTML = th;
tbody?.appendChild (tr)

const btnDelete = tr.querySelector(".btn-dlt") as HTMLButtonElement;
if (btnDelete){
  btnDelete.onclick = () => {
    let modalText = document.querySelector(".modal-body")
    modalText!.textContent = `Are you sure you want to delete ${user.nome}?`
    modal.showModal();
  }
}
});

}
getUsers()