import { useState } from "react";
const [usuarioLogado, setUsuarioLogado] = useState("dgdsdsfsdds");

    function logarUsuario(params){  
           setUsuarioLogado(params)
           localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    }


   