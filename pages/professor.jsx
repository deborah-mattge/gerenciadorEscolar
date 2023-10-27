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
  const [alunoMediaHTML, setAlunoMediaHTML] = useState([]);


  const [able, setAble] = useState(false);
  const [ableNota, setAbleNota] = useState(false);


  let usuarioLogado = "";
  let alunos = [];
  let notas = [];
  let nomeProva = "";
  let mediaAluno = [];




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
  async function pegaMedia(){
    let newAlunosHTML = [];


     await axios.get(API_URL+"procedure/boletim/"+usuarioLogado.disciplina.id).then((response)=>{
      mediaAluno = response.data
     })
     console.log(mediaAluno)
    mediaAluno.map((aluno)=>{
      newAlunosHTML.push(
        <div key={aluno.aluno_id} className="flex gap-8">
        <InputUser nome={aluno.aluno_nome} key={aluno.aluno_id}></InputUser>
        <div className="bg-[#5D779F] text-white flex items-center p-4 px-16 rounded-lg">{aluno.media}</div>
        </div>
       


      )


    })
    setAlunoMediaHTML(newAlunosHTML);


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
                if(nomeProva=="                                                               "){
                  alert("nome da prova não pode estar vazio")
                }else{
             
                alunosHTML.map(async (aluno) => {
                  axios.post(API_URL + "prova", {
                    aluno: {
                      id: aluno.key,
                    },
                    nota: document.querySelector("#" + aluno.props.nome).value,
                    professor: {
                      id: usuarioLogado.id,
                    },
                    nome: nomeProva,
                    turma:{
                      id:usuarioLogado.turma.id
                    },
                    disciplina:{
                      id:usuarioLogado.disciplina.id
                    
                    }
                  }
                  );
                });
                alert("prova cadastrada")
                setAble(true)
              }


              }}
            >
              cadastras prova
            </button>
          </div>
        </div>
      )}
       <div >
      <HeaderTitle
        texto={"Média dos alunos "}
        able={ableNota}
        parentToChild={setAbleNota}
        media
        pegaMedia={pegaMedia}
      />
      {!ableNota && (
        <div className="flex flex-col py-12 px-16  rounded-b-lg bg-[#EFEFE9] mb-16">
        <div className="flex-col flex gap-4">
          <div className="flex gap-[88px]"></div>
        </div>
        <div className="gap-8 flex-col flex">
        {alunoMediaHTML}

        </div>

        </div>
           
          
      )


      }
      </div>    


    </div>
   
    </div>
  );
}



