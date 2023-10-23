// const getTurmasT = async () => {
//     const response = await axios.get(API_URL + "/turma");
//     console.log(response.data)
//     listaTurmas = response.data

//     adicionarTurmaAoProfessor(turmaObj.id)


//   }

const API_URL = "http://localhost:8082/"
const axios = require("axios").default;



export async function getAllSomething(param) {
    const response = await axios.get(API_URL + param)
    return response.data
}

export async function getOneSomething(param, id) {
    const response = await axios.get(API_URL + param + "/" + id)
    return response.data
}