import { getAllSomething, getOneSomething } from "@/request/get";
import { getOneLS } from "@/request/getLocalStorage";
import { useEffect, useState } from "react";
import Subtitle from "@/components/Subtitle";
import HeaderTitle from "@/components/HeaderTitle";
import InputUser from "@/components/InputUser";
import AlunoNota from "@/components/AlunoNota";

export default function Aluno() {
    const [provasAluno, setProvasAluno] = useState([]);
    const [able, setAble] = useState(false)
    const [containerProvas, setContainerProvas] = useState(<div className="w-screen h-screen">

        {provasAluno}
    </div>)
async function provasPDisciplina(){

   let listaDisciplinas = []
    provasAluno.map((prova)=>{
        // console.log(prova.props.disciplina)
        if (prova.props.disciplina != "n/a"){
            let disciplinaId = prova.props.disciplina
            console.log(listaDisciplinas.length == 0)
            if(listaDisciplinas.length == 0 || !checkIfContains(listaDisciplinas, disciplinaId)){
                listaDisciplinas.push(disciplinaId)
                // console.log("é isso")
            }
        }
    })
    let nomeDisciplinas = []
    listaDisciplinas.map(async (disciplinaId)=>{
       let disciplina = await getOneSomething(
            "disciplina",disciplinaId
        )

        nomeDisciplinas.push(disciplina.nome)

        console.log(nomeDisciplinas)
    })
    // provasAluno.map((prova)=>{
    //     // console.log(prova.props.disciplina)
    //     if (prova.props.disciplina != "n/a"){
    //         console.log(listaDisciplinas)
    //         for(let disciplina of listaDisciplinas){
    //             console.log("I'm For")
    //             if(prova.props.disciplina == disciplina){
    //                 console.log("aqui")
    //                 console.log(disciplina)
    //                 console.log(prova)
    //             }
    //         }
    //     }
    // })
}

    async function checkIfContains(array, element){
        console.log("Arraye")
        console.log(array)
        if(
            await array.map((arrayElement) => {
            console.log("arrayElementt")
            console.log(arrayElement)
            console.log("elemento")
            console.log(element)
            if(arrayElement == element){
                console.log("existe")
                return true
            }
        })   
        ){
            return true
        }
        console.log("nao existe")
        return false
    }


    async function pegarProvas() {

        const usuarioLogado = await getOneLS("usuarioLogado");
        console.log(usuarioLogado);
        let provas = [];
        let anterior = -1;
        provas = await getAllSomething("prova");
        await provas.map((prova, indice) => {
            if (!(anterior == indice)) {
                if (usuarioLogado.id == prova.aluno.id) {
                    provasAluno.push(<AlunoNota notaNome={prova.nome} disciplina={prova.disciplina !=null ? prova.disciplina.id : "n/a"} nota={prova.nota} key={indice} />);
                }
                anterior = indice
            }

        });
        setProvasAluno(provasAluno)
        console.log(provasAluno)
        setContainerProvas(<div className="w-screen h-screen">
            {provasAluno}
        </div>)
        await provasPDisciplina()

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
                    texto={"Notas"}
                    able={able}
                    parentToChild={setAble}
                    mapeaAlunos={pegarProvas}
                    mapear
                    apaga={setProvasAluno}
                    apagar
                />
{!able && (
 <div className="flex flex-col py-12 px-16 gap-16 rounded-b-lg bg-[#EFEFE9] mb-16">
{provasAluno}
</div>
)}
            </div>





        </div>
    )
    // return (
    //     <div className="flex justify-center w-screen">

    //         <div className="w-4/5 ">
    //             <HeaderTitle
    //                 texto={"Notas"}
    //                 able={able}
    //                 parentToChild={setAble}
    //                 mapeaAlunos={pegarProvas}
    //                 mapear
    //                 apaga={setProvasAluno}
    //                 apagar
    //             />
    //         </div>

    //         {!able && (
    //             <div className="flex flex-col py-12 px-16 gap-16 rounded-b-lg bg-[#EFEFE9] mb-16">
    //                 <div className="flex-col flex gap-4">
    //                     <Subtitle subtitle="Dê um nome para essa nova turma" />
    //                     <div className="flex gap-[88px]">
    //                         <InputUser
    //                             id={"addTurma"}
    //                             placeholder={"Escreva o nome da turma"}
    //                             write
    //                         />
    //                     </div>
    //                 </div>

    //         )
    //         }
    //         </div>
}
