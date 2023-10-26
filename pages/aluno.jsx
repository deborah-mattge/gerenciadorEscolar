import { getAllSomething } from "@/request/get";
import { getOneLS } from "@/request/getLocalStorage";

export default function Aluno() {
  async function pegarProvas() {
    const usuarioLogado = await getOneLS("usuarioLogado");
    let provasAluno = [];
    console.log(usuarioLogado);
    let provas = [];
    provas = await getAllSomething("prova");
    await provas.map((prova) => {
      if (usuarioLogado.id == prova.alunoId) {
        provasAluno.push(prova);
      }
    });
  }

  return <div className="w-screen h screen"></div>;
}
