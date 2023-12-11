var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const tbody = document.querySelector(".tbody_list");
let departs = "";
let users = "";
function fillDeparts() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://127.0.0.1:3500/departamentos");
        const departList = yield resp.json();
        departs = departList;
        console.log(departs);
    });
}
fillDeparts();
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://127.0.0.1:3500/usuarios");
        const usersList = yield resp.json();
        users = usersList;
        users.forEach(user => {
            const tr = document.createElement("tr");
            const th = ` <td><a href="user.html?id=${user.id}"><img src="${user.foto}"></a></td>
  <td><a href="user.html?id=${user.id}">${user.nome} ${user.sobrenome}</a></td>
  <td>${user.cpf}</td> 
  <td>${user.sexo}</td>
  <td>${user.email}</td>
  <td>
  <button type="button" class="btn btn-primary btn-sm btn-edt">EDIT</button>
  <button type="button" class="btn btn-primary btn-sm btn-dlt">DELETE</button>
  </td>`;
            tr.innerHTML = th;
            tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
        });
    });
}
getUsers();
export {};
