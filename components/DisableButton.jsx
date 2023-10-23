import { useState } from "react";

export default function ButtonLuka(props) {
  if (props.disciplina == "" && props.add){
    return (
      <div className="flex bg-[#1B4079] p-4 gap-4 rounded-lg oi" onClick={(e)=>{
console.log(e)
      }}>
      <div className="buttonText  text-[#FCFCFC] flex items-center">{"Adicionar Disciplina"}</div>
    </div>
    )

  }
  return (
    <div className="flex bg-[#1B4079] p-4 pr-8 gap-4 rounded-lg oi">
      <div className="buttonText  text-[#FCFCFC] flex items-center">{props.disciplina}</div>
      <img src="bag.svg" width={"24px"} />
    </div>
  );
}

/*
  const apiUrlFilmes = "https://api.themoviedb.org/3/movie/157336?";
  const chaveAPIComImagem =
    "api_key=42e55a6cd147de3659e21ea8878ab230&append_to_response=videos,images";
  const chaveAPI = "42e55a6cd147de3659e21ea8878ab230";
  // link original "https://api.themoviedb.org/3/discover/movie?page=200&"
  const buscaAPIPorPagina =
    "https://api.themoviedb.org/3/discover/movie?page= ";


    const [texto, setTexto] = useState("abacaxi")



    function procuraMateria(id, numero){
        fetch(buscaAPIPorPagina + numero + "&" + chaveAPIComImagem, {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let numeroAleatorio = Math.floor(Math.random() * 15);
            console.log(data.results[numeroAleatorio].title);
            setTexto(data.results[numeroAleatorio].title)
      });



    }
    */
