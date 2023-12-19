import { Idepartamentos, Iusuario } from "./types";

const divDeparts = document.querySelector (".departs")

let departs: Idepartamentos[] = ""

async function fillDeparts (){
  const resp = await fetch("http://127.0.0.1:3500/departamentos")
  const departList = await resp.json()
  departs = departList
  departs.forEach (depart => {
  const div = document.createElement ("div")
  div.classList.add ("col-sm-10")
  div.innerHTML = 
  `<div class ="mb-2">
    <input class="form-check-input" type="checkbox" id=${depart.id} />
    <label class="form-check-label" for=${depart.id}> ${depart.nome} </label>
   </div>`
   divDeparts?.appendChild (div)
  })

}  
fillDeparts ()
