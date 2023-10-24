import { getAllSomething } from "@/request/get";
import ButtonLuka from "./DisableButton";
import InputUser from "./InputUser";
import { useState } from "react";
import axios from "axios";

export default function User(props) {
const [containerSelect, setContainerSelect] = useState()
const [caraios, setCaraios] = useState([])
let clicked = false;
let API_URL = "http://localhost:8082/";


  async function insereDisciplina(){
    let select = document.querySelector("#"+props.nome)
    console.log(props.idProf)
    console.log(select.value)
    await axios.put(API_URL+"professor",{
      nome: props.nome,
      id: props.idProf,
      disciplina: {
          id: select.value
      }
    }).then((promisse)=>{
    console.log(promisse)
    })
  }

  return (
    <div className="flex-col flex gap-[12px] w-full bg-[#efefe5] rounded-lg">
      <div className="flex gap-[88px] w-full bg-[#efefe5] rounded-lg">
        <InputUser nome={props.nome} />
        <ButtonLuka profId={props.idProf} rosa student={props.student} add={props.add}  disciplina={props.disciplina} funcao={insereDisciplina} />
      </div>
      {props.add && (
        <select
          id={props.nome}
          className="flex bg-[#efefe5] self-start"
          tipo={"text"}
          onClick={async ()=>{
            if (props.add){
                await props.onde()

                setCaraios(props.disciplinas)
 


            }
            }
           } >
                    
                        {
                            caraios
                    }  
                    
  

                    
          <option defaultValue={"Escolha seu cargo"}>Escolha a disciplina desse professor</option>

        </select>
      )}
    </div>
  );
}
