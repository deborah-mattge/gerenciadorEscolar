import { useState } from "react";
import Subtitle from "@/components/Subtitle";
import Professor from "@/components/Professor";
import InputUser from "@/components/InputUser";

export default function Page() {
  const chaveAPIComImagem =
    "api_key=42e55a6cd147de3659e21ea8878ab230&append_to_response=videos,images";
  const buscaAPIPorPagina =
    "https://api.themoviedb.org/3/discover/movie?page= ";

  const axios = require("axios").default;
  let lista = [];
  let listaTurmas = [];

  const [professoresHtml, setProfessoresHtml] = useState([]);
  const [containerListaProfs, setcontainerListaProfs] = useState(
    <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
      {professoresHtml}
    </div>
  );

  var turmaObj = new Object();
  turmaObj.id = 2;
  turmaObj.nome = "";
  var professor = new Object();
  professor.title = "oi";
  professor.original_language = "en";
  /*
  professor.nome = ""
  professor.disciplina = ""
  professor.id=1
  */
  const  [listaProfessores, setListaProfessores] = useState([])

  function getProfessores() {
    axios
      .get(buscaAPIPorPagina + 7 + "&" + chaveAPIComImagem)
      .then((response) => {
        lista = response.data.results;
      })
      .catch((error) => console.log(error));
  }

  function renderizarProfessores() {
    /* Versão Correta, para funcionar é necessário que seja realizada a mudança no objeto professor 


    let input = document.querySelector(#addTeacher)

    if (listaProfessores.length>0){
        listaProfessores.map((prof) => {
        if (prof.nome == input.value) {
            input.value = "";
            alert("Já ta adicionado pô");
        }
      })
    }

      lista.map((professor, indice)=>{
      if (professor.nome == input.value){
            professoresHtml.push(<Professor key={indice+2} nome={professor.nome} disciplina={professor.disciplina.nome} />);
            professorObj.nome = professor.nome
            professorObj.disciplina = professor.disciplina.id
            professorObj.id = professor.id
            listaProfessores.push(professorObj)
        }
      })
      input.value = ""
      
        setProfessoresHtml(professoresHtml);
        setcontainerListaProfs(
      <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
        {professoresHtml}
      </div>
    )
      

        */

    console.log(lista);
    if (listaProfessores.length > 0) {
      listaProfessores.map((prof) => {
        console.log("sou o professor\n" + prof);
        if (prof.title == document.querySelector("#addTeacher").value) {
          document.querySelector("#addTeacher").value = "";
          alert("Já ta adicionado pô");
        }
      });
    }

    lista.map((item, indice) => {
      if (item.title === document.querySelector("#addTeacher").value) {
        professoresHtml.push(
          <Professor
            key={indice + 2}
            nome={item.title}
            disciplina={item.original_language}
          />
        );
        professor.title = item.title;
        professor.original_language = item.original_language;
        listaProfessores.push(professor);
        console.log(listaProfessores)
      }
      console.log(item.title);
    });
    console.log(listaProfessores);
    document.querySelector("#addTeacher").value = "";

    setProfessoresHtml(professoresHtml);
    setcontainerListaProfs(
      <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
        {professoresHtml}
      </div>
    );
  }

  function getTurmas() {
    axios
      .get(API_URL+"/turma")
      .then((response) => {
        listaTurmas = response.data.results;
      })
      .catch((error) => console.log(error));
  }

  getProfessores();

  function adicionarTurmaAoProfessor(id) {
    listaProfessores.map((professor) => {
      axios
        .put(API_URL+"/professor", {
          id: professor.id,
          turma: {
            id: id,
          },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    });

    // listaProfessores = [];
  }

  function adicionarTurma() {
    let turmaInput = document.querySelector("#addTurma");
    axios
      .post("/turma", {
        nome: turmaInput.value,
      })
      .then((response) => {
        getTurmas();
        listaTurmas.map((turma) => {
          if (turma.nome == turmaInput.nome) {
            turmaObj.nome = turma.nome;
            turmaObj.id = turma.id;
            adicionarTurmaAoProfessor(turmaObj.id);
          }
        });

        turmaInput.value = "";
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <header className="w-full flex justify-end bg-[#5D779F] py-4 px-8 items-center">
        <div className="flex gap-3">
          <p className="text-[#FCFCFC]">Pedrinho</p>
          <img src="profile.svg" alt="" />
        </div>
      </header>
      <div className="mt-16 flex flex-col w-4/5 h-aUto  bg-[#EFEFEF] rounded-lg">
        <div className="flex justify-between bg-[#1B4079] rounded-t-lg p-4 py-6 w-full items-center">
          <p className="text-[#FCFCFC] w-full h-6 text-2xl items-center flex font-semibold">
            Criar Turma
          </p>
          <img src="arrowUp.svg" alt="" />
        </div>
        <div className="flex flex-col py-12 px-16 gap-16">
          <div className="flex-col flex gap-4">
            <Subtitle subtitle="Dê um nome para essa nova turma" />
            <div className="flex gap-[88px]">
              <InputUser
                id={"addTurma"}
                placeholder={"Escreva o nome da turma"}
                write
              />
            </div>
          </div>

          <div className="flex-col flex gap-4">
            <Subtitle subtitle="Adicione Professores à turma" />
            <div className="flex gap-[88px]">
              <InputUser
                id={"addTeacher"}
                placeholder={"Escreva o nome do professor aqui"}
                write
              />
              <button
                className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
                onClick={() => {
                  renderizarProfessores();
                }}
              >
                Adicionar
              </button>
            </div>
            <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
              {professoresHtml}
            </div>
            {/* ou usa a variavel div */}
            <button
              className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
              onClick={() => {
                adicionarTurma();
              }}
            >
              Criar Turma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
