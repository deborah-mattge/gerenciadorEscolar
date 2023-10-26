import { getAllSomething, getOneSomething } from "@/request/get";
import ButtonLuka from "./DisableButton";
import InputUser from "./InputUser";
import { useState } from "react";
import axios from "axios";

export default function User(props) {
  const [containerSelect, setContainerSelect] = useState()
  const [caraios, setCaraios] = useState([])
  let clicked = false;
  let API_URL = "http://localhost:8082/";


  async function insereDisciplina() {
    let select = document.querySelector("#" + props.nome)
    console.log(props.idProf)
    console.log(select.value)
    await axios.put(API_URL + "professor", {
      nome: props.nome,
      id: props.idProf,
      disciplina: {
        id: select.value
      }
    }).then((promisse) => {
      console.log(promisse)
    })
  }


  async function pegaUser(turma, path) {
    let lista = []
    let listaUser = []
    lista = await getAllSomething(path)
    await lista.map((user) => {
      if (user.turma != null) {
        if (user.turma.id == turma.id) {
          listaUser.push(user)
        }
      }
    })
    return listaUser

  }


  async function pegaTurma() {
    let lista = [];
    lista = await getAllSomething("turma")
    let turmaa = null;

   await lista.map((turma) => {
      if (turma.nome == props.nome) {
        console.log(turma)
        turmaa = turma
      }
    })

return turmaa
  }

  async function gerarBoletim() {

    let turma = await pegaTurma();
    console.log(turma)
    let professores = []
    professores = await pegaUser(turma, "professor");
    let alunos = []
    alunos = await pegaUser(turma, "aluno");
    alunos.map((aluno)=>{
      professores.map((professor)=>{
        if (professor.disciplina!=null){
          console.log("oi")
          axios.post(API_URL+"boletim", {
            idDisciplina:professor.disciplina,
            idTurma:turma.id,
            idAluno:aluno.id
          })
        } 
      })
    })





  }








  return (
    <div className="flex-col flex gap-[12px] w-full bg-[#efefe5] rounded-lg">
      <div className="flex gap-[88px] w-full bg-[#efefe5] rounded-lg">
        <InputUser nome={props.nome} />
        <ButtonLuka profId={props.idProf} texto={"Gerar Boletim"}  gerarBoletim={props.boletim} student={props.student} add={props.add} boletim={gerarBoletim} disciplina={props.disciplina} funcao={insereDisciplina} />
      </div>
      {props.add && (
        <select
          id={props.nome}
          className="flex bg-[#efefe5] self-start"
          tipo={"text"}
          onClick={async () => {
            if (props.add) {
              await props.onde()

              setCaraios(props.disciplinas)



            }
          }
          } >

          {
            caraios
          }

          {/* <option defaultValue={"Escolha seu cargo"}>Escolha a disciplina desse professor</option> */}

        </select>
      )}
    </div>
  );
}
