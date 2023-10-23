import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
export default function cadastro(){
  const axios = require("axios").default;
  let usuarios = []
  const apiURl = "http://localhost:8082";
  function pegaDados(){
    
   axios.get(apiURl + "/usuario")
   .then((response)=>{
        usuarios = response.data
   })
   .catch((erro)=>console.log(erro))
   console.log(usuarios)

}
 
   function validarDados(){
    let senha =  document.querySelector("#senha");
    let nivel = document.querySelector("#nivel")
    let nome = document.querySelector("#nome")
    let endereco = document.querySelector("#endereco")
    let id = document.querySelector("#id")
    let idade = document.querySelector("#idade")

    


 
    usuarios.map((prof) => {
     if (prof.id == id.value) {
         alert("Um usuario com esse cadastrado já existe")
     }
    })

      
        axios.post(apiURl+ '/'+nivel.value, {
          
            "id": id.value,
            "senha": senha.value,
            "nome":nome.value,
            "endereco": endereco.value,
            "idade" : idade.value,
    
        }
        
        )
        .then(function (response) {
          console.log(response);
          alert("Conta cadastrada com sucesso!")
        })
        .catch(function (error) {
          alert("Não foi posssível cadastrar sua conta!")
          console.error(error);
        });
      
      return true
     }


   pegaDados(); 
 
    return(
        <div className="w-screen h-screen bg-[#8B9EBB] flex justify-between">
        <div id="Parte azul" className=" flex flex-col gap-[300px]">
          <h1 className="text-white font-extrabold text-5xl w-[400px] pt-20 pl-20">
            Gerenciador Escolar{" "}
          </h1>
          <div className="h-[485px] overflow-clip">
            <img src="Group 1.svg" width={"525px"} />
          </div>
        </div>
  
        <div id="parte branca " className="bg-white rounded-l-[50px] w-3/5 h-full flex justify-center items-center "  >
          <div className="h-[717px] w-[717px]  rounded-xl flex flex-col gap-[30px] justify-center items-center sombra ">
              <h1 className=" text-5xl font-extrabold">Cadastro</h1>
              <div className="flex flex-col gap-8 w-full p-10 items-center pt-0">
                  <Input id={"nome"} texto={"Nome"} tipo={"text"}></Input>
                  <Input id={"id"} texto={"Matricula/ Cadastro"} tipo={"number"}></Input>
                  <Input id={"idade"} texto={"idade"} tipo={"number"}></Input>
                  <Input id={"endereco"} texto={"CEP" } tipo={"text"} ></Input>
                  <Input id={"senha"} texto={"Senha"}tipo={"text"}></Input>
                  <select id={"nivel"} className="flex self-start mx-8" tipo={"text"}>
                    <option defaultValue={"Escolha seu cargo"}> Escolha seu cargo</option>
                    <option value={"professor"}>professor </option>
                    <option value={"aluno"}>aluno </option>
                    <option value={"secretario"}>secretário </option>
                  </select>

              </div>
              <Button texto={"Cadastrar"} tamanho={"w-[575px] p-4"} parentToChild={validarDados} ></Button>
              <div className="flex gap-1">
              <p>Já tem uma conta? </p>
              <Link href={"/"}> <p  className="text-[#1B4079]">Login</p> </Link>
              </div>
             
  
          </div>
        </div>
      </div>
    )
}