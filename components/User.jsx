import { getAllSomething } from "@/request/get";
import ButtonLuka from "./DisableButton";
import InputUser from "./InputUser";
import { useState } from "react";

export default function User(props) {
const [containerSelect, setContainerSelect] = useState()
const [caraios, setCaraios] = useState([])
let clicked = false;


  return (
    <div className="flex-col flex gap-[12px] w-full bg-[#efefe5] rounded-lg">
      <div className="flex gap-[88px] w-full bg-[#efefe5] rounded-lg">
        <InputUser nome={props.nome} />
        <ButtonLuka student={props.student} add={props.add} disciplina={props.disciplina} />
      </div>
      {props.add && (
        <select
          id={"nivel"}
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
