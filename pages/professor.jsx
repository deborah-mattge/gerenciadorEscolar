import HeaderTitle from "@/components/HeaderTitle";
import { useState } from "react";
import Subtitle from "@/components/Subtitle";
import InputUser from "@/components/InputUser";
import { getAllSomething } from "@/request/get";
import { useEffect } from "react";
import { getOneLS } from "@/request/getLocalStorage";
export default function professor() {
  const axios = require("axios").default;
  let API_URL = "http://localhost:8082/";
  const [alunosHTML, setAlunosHTML] = useState([]);
  const [able, setAble] = useState(false);
  let usuarioLogado = "";
  let alunos = [];
  let notas = [];
  let nomeProva = ""; 

  async function buscaNota(param) {
    console.log(param);
    notas.push(param);
    console.log(notas);
  }
  usuarioLogado = getOneLS("usuarioLogado");
  console.log(usuarioLogado);

  async function mapeaAlunos() {
    let newAlunosHTML = [];

    alunos = await getAllSomething("aluno");
    console.log(usuarioLogado.turma.id);

    if (usuarioLogado.turma != undefined && usuarioLogado.turma != null) {
      console.log(4);
      alunos.map((aluno) => {
        console.log(aluno.turma);
        if (
          aluno.turma.id != null &&
          aluno.turma.id == usuarioLogado.turma.id
        ) {
          console.log(2);
          newAlunosHTML.push(
            <InputUser nome={aluno.nome} key={aluno.id}></InputUser>
          );
          console.log(newAlunosHTML);
        }
      });
    }
    setAlunosHTML(newAlunosHTML);
  }

  return (
    <div className="flex justify-center w-screen">
      
    <div className="w-4/5">
      <HeaderTitle
        texto={"Cadastrar Prova"}
        able={able}
        parentToChild={setAble}
        mapeaAlunos={mapeaAlunos}
        mapear
      />
      {!able && (
        <div className="flex flex-col py-12 px-16  rounded-b-lg bg-[#EFEFE9] mb-16">
          <div className="flex-col flex gap-4">
            <div className="flex gap-[88px]"></div>
          </div>
          <Subtitle subtitle="Cadastre o nome da prova: " />
              <div className="flex gap-[88px]">
                <InputUser
                  id={"nomeProva"}
                  placeholder={"Escreva o nome da prova aqui: "}
                  write
                />
                <button
                  className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
                  onClick={() => {
                   nomeProva=document.querySelector("#nomeProva").value
                   console.log(nomeProva)
                  }}
                >
                  Adicionar
                </button>
              </div>
              

          <div className="flex-col flex gap-4">
            <Subtitle subtitle="Cadastre as notas " />
            <div className="flex gap-8 items-center">
            <div className="flex flex-col gap-8 w-full">{alunosHTML}</div>
            <div className="flex flex-col gap-8 bg-[#EFEFE8]">
              {alunosHTML.map((aluno, index) => (
                <InputUser
                  key={aluno.key}
                  funcao={buscaNota}
                  id={aluno.props.nome}
                  placeholder={"nota"}
                  write
                />
              ))}
            </div>
            </div>

            <button
              className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
              onClick={() => {
                alunosHTML.map(async (aluno) => {
                  axios.post(API_URL + "prova", {
                    aluno: {
                      id: aluno.key,
                    },
                    nome: nomeProva,
                    nota: document.querySelector("#" + aluno.props.nome).value,
                    professor: {
                      id: usuarioLogado.id,
                    },
                    disciplina:{
                      id: usuarioLogado.disciplina.id
                    },
                    turma:{
                      id: usuarioLogado.turma.id
                    }
                    
                  }
                  );
                });
                alert("prova cadastrada")
                setAble(true)

              }}
            >
              cadastras prova
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
