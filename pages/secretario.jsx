import Subtitle from "@/components/Subtitle";
import Professor from "@/components/Professor";
import InputUser from "@/components/InputUser";
import { useState } from "react";

export default function Secretario() {
  let cadastro = "aaaaaa";
  const API_URL = "http://localhost:8082";
  const [professores, setProfessores] = useState([]);

  function getTeachers() {
    fetch(API_URL + "/professor", {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let results = data;
        results.map((result) => {
            console.log(result.nome)
          if (result.nome === "aaaaaa") {
            console.log("Im hrere")
            let professor = <Professor key={1} materia={result.nome}></Professor>;
            console.log(professor)
            let teachers = professores;
            teachers.push(professor.innerHtml);
            console.log(teachers)
            setProfessores(teachers);
          }
        });
      });
  }
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className=" w-[1330px] flex flex-col">
        <div className="h-[92px] bg-blue-600"></div>

        <div className="flex flex-col w-full h-full p-4">
          <div className="flex flex-col gap-4 py-4">
            <Subtitle subtitle={"Dê um nome para essa nova turma"} />
            <InputUser write placeholder={"Escreva o nome da turma"} />
          </div>
          <div className="flex flex-col gap-4 py-4">
            <Subtitle subtitle={"Adicione Professores à turma"} />
            <div className="flex gap-[88px]">
              <InputUser write placeholder={"Escreva o nome do Professor"} />
              <button
                onClick={getTeachers}
                className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
              >
                Adicionar
              </button>
            </div>
          </div>
          {professores}
        </div>
      </div>
    </div>
  );
}
