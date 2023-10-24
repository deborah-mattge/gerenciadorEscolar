import HeaderTitle from "@/components/HeaderTitle"
import { useState } from "react";
import Subtitle from "@/components/Subtitle";
import InputUser from "@/components/InputUser";
import { getAllSomething } from "@/request/get";
import { usuarioLogado } from "@/data/usuario";
export default function professor(){
    const [alunosHTML, setAlunosHTML]= useState([]);
    const [able, setAble] = useState(false);
    useEffect(() => {
      const usuarioArmazenado = localStorage.getItem('usuarioLogado');
      if (usuarioArmazenado) {
        setUsuarioLogado(JSON.parse(usuarioArmazenado));
      }
    }, []);

    async function mapeaAlunos(){
        let alunos = []
        alunos = await getAllSomething("aluno")
        console.log(usuarioLogado)

        if( usuarioLogado.turma !=undefined && usuarioLogado.turma !=null ){
          console.log(4)
        alunos.map((aluno)=>{
          console.log(3)
            if(aluno.turma.id!=null && aluno.turma.id == usuarioLogado.turma.id){
              console.log(2)
              alunosHTML.push(<InputUser nome={aluno.nome} key={aluno.id}></InputUser>)
            }
          
            console.log(e)
          
        
           
        })
      }
        setAlunosHTML( alunosHTML)
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
                <InputUser
                  id={"addNomeProva"}
                  placeholder={"Escreva o nome da prova"}
                  write
                />
                   <button
                  className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
                  onClick={() => {
                    adicionarNomeProva();
                  }}
                >Adiciona</button>
              </div>
            </div>


            <div className="flex-col flex gap-4">
              <Subtitle subtitle="Adicione Professores à turma" />
              <div className="flex gap-[88px]">
                {alunosHTML}
              </div>
              <div className="flex flex-col gap-8 pt-8 bg-[#EFEFE8] w-full">
           
              </div>
              {/* ou usa a variavel div */}
              <button
                className="bg-[#1B4079] py-4 px-12 buttonText text-[#FCFCFC] rounded-lg"
                onClick={(e) => {
                  adicionarTurma();
                }}
              >
                Criar Turma
              </button>
            </div>
          </div>
        )}


        </div>
    )
}
