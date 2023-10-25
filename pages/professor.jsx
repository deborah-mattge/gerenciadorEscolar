import HeaderTitle from "@/components/HeaderTitle"
import { useState } from "react";
import Subtitle from "@/components/Subtitle";
import InputUser from "@/components/InputUser";
import { getAllSomething } from "@/request/get";
import { useEffect } from "react";
import { getOneLS } from "@/request/getLocalStorage";
export default function professor(){
    const [alunosHTML, setAlunosHTML]= useState([]);
    const [able, setAble] = useState(false);
    const [notas, setNotas] = useState([]);
    const adicionarNota = (novaNota) => {
      console.log(novaNota)
      setNotas([...notas, novaNota]);
  };

    let usuarioLogado=""; 
    let alunos = [] 
    
    // useEffect(() => {
    //   const usuarioArmazenado = localStorage.getItem('usuarioLogado');
    //   console.log(usuarioArmazenado)
    //   if (usuarioArmazenado) {
    //     usuarioLogado(JSON.parse(usuarioArmazenado));
    //   }
    // }, []);


   usuarioLogado = getOneLS("usuarioLogado")
    console.log(usuarioLogado)

    async function mapeaAlunos(){
      let newAlunosHTML = [];
        
        alunos = await getAllSomething("aluno")
        console.log(usuarioLogado)

        if( usuarioLogado.turma !=undefined && usuarioLogado.turma !=null ){
          console.log(4)
        alunos.map((aluno)=>{
          console.log(aluno.turma)
            if(aluno.turma.id!=null && aluno.turma.id == usuarioLogado.turma.id){
              console.log(2)
              newAlunosHTML.push(<InputUser nome={aluno.nome} key={aluno.id} parentToChild={adicionarNota}></InputUser>)
            }
          
          
        
           
        })
      }
        setAlunosHTML( newAlunosHTML)
        }




    return(
        <div>
            <HeaderTitle
          texto={"Cadastrar Prova"}
          able={able}
          parentToChild={setAble}
          mapeaAlunos={
            mapeaAlunos
          }
          mapear


            />
            {!able && (
          <div className="flex flex-col py-12 px-16 gap-16 rounded-b-lg bg-[#EFEFE9] mb-16">
            <div className="flex-col flex gap-4">
   
              <div className="flex gap-[88px]">
             
               
              </div>
            </div>


            <div className="flex-col flex gap-4">
              <Subtitle subtitle="Adicione Professores à turma" />
              <div className="flex gap-[88px]">
                {alunosHTML}
              </div>
              <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
             
                {
                alunosHTML.map((aluno, index) => (
                  
                  <InputUser
                    key={index}
                    id={"addNomeProva"}
                    placeholder={"Escreva o nome da prova"}
                    write
                  />
                 
                  
                  ))}
             
              </div>
              {/* ou usa a variavel div */}
              <button
                className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
                // onClick={(e) => {
                //   adicionarTurma();
                // }}
              >
                Criar Turma
              </button>
            </div>
          </div>
        )}


        </div>
    )
}
