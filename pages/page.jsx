import { useState } from "react";
import Subtitle from "@/components/Subtitle";
import InputUser from "@/components/InputUser";
import { version } from "react-dom";
import { getAllSomething } from "@/request/get";
import { list } from "postcss";
import HeaderTitle from "@/components/HeaderTitle";
import User from "@/components/User";

export default function Page() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [modalAddDisciplina, setModalAddDisciplina] = useState(false);
  let lista = [];
  const [listaProfessoresAdicionados, setListaProfessoresAdicionados] =
    useState([]);

  const [able, setAble] = useState(false);
  const [ableDisciplina, setAbleDisciplina] = useState(false);

  const axios = require("axios").default;
  let API_URL = "http://localhost:8082/";

  const [professoresHtml, setProfessoresHtml] = useState([]);
  const [alunosHtml, setAlunosHtml] = useState([]);
  const [containerListaAlunos, setcontainerListaAlunos] = useState(
    <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
      {alunosHtml}
    </div>
  );
  const [listaAlunosAdicionados, setListaAlunosAdicionados] =
    useState([]);
  const [todosProfessoresHtml, setTodosProfessoresHtml] = useState([]);
  const [containerListaProfs, setcontainerListaProfs] = useState(
    <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
      {professoresHtml}
    </div>
  );
  const [containerOptions, setContainerOptions] = useState(
    <select
      id={"nivel"}
      className="flex bg-[#efefe5] self-start"
      tipo={"text"}
      onClick={() => {
        if (props.add) {
          props.onde()
        }
      }
      } >
      <option defaultValue={"Escolha seu cargo"}>Escolha a disciplina desse professor</option>
      {
        disciplinas

      }
    </select>
  );
  const [containerTodosProfessoresHtml, setcontainerTodosProfessoresHtml] =
    useState(
      <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
        {todosProfessoresHtml}
      </div>
    );


  async function pegarDisciplinas() {
    let lista = await getAllSomething("disciplina");
    let bah = true;
    console.log("carai");
    lista.map((disciplina) => {
      console.log("eentrein no map grnadão")
      disciplinas.map((cocota) => {
        console.log(cocota)
        if (disciplina.id == cocota.key) {
          console.log("EU TO REPETIDO CUZÃO")
          bah = false
        }
      })
      console.log(bah)
      if (bah) {
        disciplinas.push(
          <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
        );
      }

    });
    setDisciplinas(disciplinas)
  }


  async function adicionarTurmaAluno() {
    console.log(listaProfessoresAdicionados);
    let input = document.querySelector("#addTurma");
    await axios.post(API_URL + "turma", {
      nome: input.value,
    });
    let turmas = [];
    turmas = await getAllSomething("turma");
    turmas.map((map) => {
      if (map.nome == input.value) {
        listaAlunosAdicionados.map(async (aluno) => {
          let alunos = [];
          alunos = await getAllSomething("aluno");
          alunos.map(async (student) => {
            if (student.nome == aluno.nome) {
              console.log(
                student.nome +
                " id = " +
                student.id +
                "id da turma = " +
                map.id
              );
              await axios.put(API_URL + "aluno", {
                nome: student.nome,
                id: student.id,
                turma: {
                  id: map.id,
                },
              });
              console.log("feito");
              setListaAlunosAdicionados([]);
              setAlunosHtml([]);
            }
          });
        });
      }
    });
  }

  async function adicionarAluno() {
    let input = document.querySelector("#addStudent");
    lista = await getAllSomething("aluno");

    //verifica se já foi adicionado
    if (listaAlunosAdicionados.length > 0) {
      console.log("O");
      listaAlunosAdicionados.map((aluno) => {
        console.log(aluno.nome);
        if (aluno.nome == input.value) {
          input.value = "";
          alert("Já ta adicionado pô");
        }
      });
    }

    lista.map((aluno, indice) => {
      if (aluno.nome == input.value) {
        console.log(listaAlunosAdicionados.length);
        input.value = ""
        console.log("I'm Here");
        console.log(alunosHtml);
        for (let i = 0; i < alunosHtml.length; i++) {
          if (alunosHtml[i].key == indice + 2) {
            return;
          }
        }
        alunosHtml.push(
          <User
            key={indice + 2}
            nome={aluno.nome}
            add={false}
            disciplina={
              aluno.turma != null ? aluno.turma.nome : ""
            }
            student
          />
        );

        listaAlunosAdicionados.push(aluno);
        console.log(listaAlunosAdicionados);
      }
    });

    setAlunosHtml(alunosHtml);
    setcontainerListaAlunos(
      <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
        {alunosHtml}
      </div>
    );
  }



  async function adicionarProfessor() {
    let input = document.querySelector("#addTeacher");
    lista = await getAllSomething("professor");

    //verifica se já foi adicionado
    if (listaProfessoresAdicionados.length > 0) {
      console.log("O");
      listaProfessoresAdicionados.map((prof) => {
        console.log(prof.nome);
        if (prof.nome == input.value) {
          input.value = "";
          alert("Já ta adicionado pô");
        }
      });
    }

    lista.map((professor, indice) => {
      if (professor.nome == input.value) {
        console.log(listaProfessoresAdicionados.length);
        input.value = ""

        console.log("I'm Here");
        console.log(professoresHtml);
        for (let i = 0; i < professoresHtml.length; i++) {
          if (professoresHtml[i].key == indice + 2) {
            return;
          }
        }
        professoresHtml.push(
          <User
            key={indice + 2}
            nome={professor.nome}
            add={false}
            disciplina={
              professor.disciplina != null ? professor.disciplina.nome : ""
            }
          />
        );

        listaProfessoresAdicionados.push(professor);
        console.log(listaProfessoresAdicionados);
      }
    });

    setProfessoresHtml(professoresHtml);
    setcontainerListaProfs(
      <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
        {professoresHtml}
      </div>
    );
  }

  async function adicionarTurma() {
    console.log(listaProfessoresAdicionados);
    let input = document.querySelector("#addTurma");
    await axios.post(API_URL + "turma", {
      nome: input.value,
    });
    let turmas = [];
    turmas = await getAllSomething("turma");
    turmas.map((map) => {
      if (map.nome == input.value) {
        listaProfessoresAdicionados.map(async (prof) => {
          let professores = [];
          professores = await getAllSomething("professor");
          professores.map(async (professor) => {
            if (professor.nome == prof.nome) {
              console.log(
                professor.nome +
                " id = " +
                professor.id +
                "id da turma = " +
                map.id
              );
              await axios.put(API_URL + "professor", {
                nome: professor.nome,
                id: professor.id,
                turma: {
                  id: map.id,
                },
              });
              console.log("feito");
              setListaProfessoresAdicionados([]);
              setProfessoresHtml([]);
            }
          });
        });
      }
    });
  }
  async function procuraProfessores() {
    let lista = [];
    lista = await getAllSomething("professor");
    console.log(lista);
    lista.map(async (professor, indice) => {
      todosProfessoresHtml.push(
        <User
          key={professor.id}
          nome={professor.nome}
          disciplina={
            professor.disciplina != null ? professor.disciplina.nome : ""
          }
          disciplinas={disciplinas}
          onde={pegarDisciplinas}
          setDisciplinas={setDisciplinas}
          add={true}
          idProf={professor.id}
        />
      );
      console.log(indice + 2);
    });
    console.log(todosProfessoresHtml);
    setTodosProfessoresHtml(todosProfessoresHtml);
    setcontainerTodosProfessoresHtml(
      <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
        {todosProfessoresHtml}
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <header className="w-full flex justify-end bg-[#5D779F] py-4 px-8 items-center">
        <div className="flex gap-3">
          <p className="text-[#FCFCFC]">Pedrinho</p>
          <img src="profile.svg" alt="" />
        </div>
      </header>
      <div className="mt-16 flex flex-col w-4/5 h-auto   rounded-lg">
        <HeaderTitle
          texto={"Criar Turma"}
          able={able}
          parentToChild={setAble}
        />
        {!able && (
          <div className="flex flex-col py-12 px-16 gap-16 rounded-b-lg bg-[#EFEFE9] mb-16">
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
                    adicionarProfessor();
                  }}
                >
                  Adicionar
                </button>
              </div>
              <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
                {professoresHtml}
              </div>
              {/* ou usa a variavel div */}

              <Subtitle subtitle="Adicione Alunos à turma" />
              <div className="flex gap-[88px]">
                <InputUser
                  id={"addStudent"}
                  placeholder={"Escreva o nome do aluno aqui"}
                  write
                />
                <button
                  className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
                  onClick={() => {
                    adicionarAluno();
                  }}
                >
                  Adicionar
                </button>
              </div>
              <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
                {alunosHtml}
              </div>
              <button
                className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
                onClick={(e) => {
                  adicionarTurma();
                  adicionarTurmaAluno()
                }}
              >
                Criar Turma
              </button>
            </div>
          </div>
        )}
        <HeaderTitle
          texto={"Atribuir Disciplina a professor"}
          procurar
          zerarProf={setTodosProfessoresHtml}
          able={ableDisciplina}
          procuraProf={procuraProfessores}
          parentToChild={setAbleDisciplina}
        />
        {!ableDisciplina && (
          <div className="flex flex-col py-12 px-16 gap-16 rounded-b-lg bg-[#EFEFE9] mb-16">
            <div className="flex-col flex gap-4">
              <Subtitle subtitle="Procure por um professor específico" />
              <div className="flex gap-[88px]">
                <InputUser
                  id={"addTurma"}
                  placeholder={"Escreva o nome do professor"}
                  write
                />
                <button
                  className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
                  onClick={() => {
                    adicionarProfessor();
                  }}
                >
                  Procurar
                </button>
              </div>
            </div>

            <div className="flex-col flex gap-4 w-full h-max">
              {modalAddDisciplina && (
                <ModalAddDisciplina
                  isOpen={modalAddDisciplina}
                  setIsOpen={setModalAddDisciplina}
                />
              )}
              <Subtitle subtitle="Lista de professores" />

              <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
                {todosProfessoresHtml}
              </div>
              {/* ou usa a variavel div */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
