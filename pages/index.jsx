import Button from "@/components/Button";
import Input from "@/components/Input";
import { getAllSomething } from "@/request/get";
import { logarUsuario, setUsuarioLogado,usuarioLogado } from "@/data/usuario";
import { useState } from "react";

import Link from "next/link";
import { getOneLS } from "@/request/getLocalStorage";


export default function Index() {
  const axios = require("axios").default;
  let usuarios = []
  const apiURl = "http://localhost:8082";
  function pegaDados(){
  
   
   axios.get(apiURl + "/usuario")
   .then((response)=>{
        usuarios = response.data
   })
   .catch((erro)=>console.log(erro))
}




  function validarDados(){
   let cadastro =  document.querySelector("#cadastro");
   let senha =  document.querySelector("#senha");
   let foi = false;


   usuarios.map((prof) => {
    console.log(prof.id)


    if (prof.id == cadastro.value) {
        cadastro.value = "";
        
       
        if (prof.senha == senha.value) {
          senha.value="";
          foi = true ;
        
          localStorage.setItem('usuarioLogado', JSON.stringify(prof));
          trocarPagina()
      }
    } })
      if(foi == false ){
        alert("Usuario não encontrado ")


      }
   



  }


  async function trocarPagina(){


    let usuariosAcharLogado = []
    let usuarioLogado = getOneLS("usuarioLogado")
    console.log(usuarioLogado.id)
    usuariosAcharLogado = await getAllSomething("professor")
    usuariosAcharLogado.map((u)=>{
 
      if(u.id==usuarioLogado.id){
        console.log("to aqui")

        window.location.href = "/professor"
       
      }
    })


    usuariosAcharLogado = await getAllSomething("aluno")
    usuariosAcharLogado.map((u)=>{
      if(u.id==usuarioLogado.id){
        window.location.href = "/aluno"
       
      }
    })
    usuariosAcharLogado = await getAllSomething("secretario")
    usuariosAcharLogado.map((u)=>{
      if(u.id==usuarioLogado.id){
        window.location.href = "/page"
       
      }
    })
  }


  pegaDados()


  return (
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
        <div className="h-[717px] w-[717px]  rounded-xl flex flex-col gap-[50px] justify-center items-center sombra ">
            <h1 className=" text-5xl font-extrabold">Login</h1>
            <div className="flex flex-col gap-9 w-full p-10 items-center">
                <Input id={"cadastro"} texto={"Matricula/Cadastro"}></Input>
                <Input id={"senha"} texto={"Senha"}></Input>
            </div>
            <Button texto={"login"} tamanho={"w-[575px] p-4"} parentToChild={validarDados}  ></Button>
            <div className="flex gap-1">
            <p>Não tem uma conta? </p>
          <Link href={"cadastro"}> <p className="text-[#1B4079] ">Cadastre-se</p> </Link>
            </div>
           


        </div>
      </div>
    </div>
  );


}
