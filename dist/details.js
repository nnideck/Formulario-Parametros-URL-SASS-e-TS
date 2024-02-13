var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modal = document.querySelector(".box_2");
const img = document.querySelector(".card-img-top");
const cardTitle = document.querySelector(".card-title");
const cardText = document.querySelector(".card-text");
const value = window.location.search;
const searchParams = new URLSearchParams(value);
let departs = [];
let userDetails;
let interestsList = [];
let urlId = 0;
function closeModal() {
    const button = document.querySelector(".btn_modal_cancel");
    button.onclick = () => {
        modal.close();
    };
}
closeModal();
if (searchParams.has("id")) {
    const id = parseInt(searchParams.get("id"));
    getUser(id);
    urlId = id;
}
function showModalOnClick() {
    let modalText = document.querySelector(".modal-body");
    modalText.textContent = `Are you sure you want to delete ${userDetails.nome} ${userDetails.sobrenome}?`;
    modal.showModal();
}
const deleteBtn = document.querySelector(".btn-dlt");
if (deleteBtn) {
    deleteBtn.onclick = () => {
        showModalOnClick();
    };
}
function fullfilInterests(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (param) {
            const resp = yield fetch("http://127.0.0.1:3500/departamentos");
            const departList = yield resp.json();
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
    });
}
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const details = yield fetch(`http://127.0.0.1:3500/usuarios/${id}`);
        const userDetail = yield details.json();
        userDetails = userDetail;
        if (id === userDetail.id) {
            cardTitle.innerHTML = `${userDetail.nome} ${userDetail.sobrenome}`;
            img === null || img === void 0 ? void 0 : img.setAttribute("src", `${userDetail.foto}`);
            yield fullfilInterests(userDetail.interesses);
            for (const item in userDetail) {
                if (userDetail[item] === userDetail.interesses) {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `<b>${item}:</b> ${interestsList}`;
                    cardText === null || cardText === void 0 ? void 0 : cardText.appendChild(tr);
                }
                else {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `<b>${item}:</b> ${userDetail[item]}`;
                    cardText === null || cardText === void 0 ? void 0 : cardText.appendChild(tr);
                }
            }
        }
    });
}
export {};
