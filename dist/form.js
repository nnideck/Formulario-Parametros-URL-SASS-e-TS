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
let departs = "";
function fillDeparts() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://127.0.0.1:3500/departamentos");
        const departList = yield resp.json();
        departs = departList;
        departs.forEach(depart => {
            const div = document.createElement("div");
            div.classList.add("col-sm-10");
            div.innerHTML =
                `<div class ="mb-2">
    <input class="form-check-input" type="checkbox" id=${depart.id} />
    <label class="form-check-label" for=${depart.id}> ${depart.nome} </label>
   </div>`;
            divDeparts === null || divDeparts === void 0 ? void 0 : divDeparts.appendChild(div);
        });
    });
}
fillDeparts();
export {};
