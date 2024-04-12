import axios from "axios"
let FLASK_URL = "http://127.0.0.1:5000" //the default port for Flask
// let FLASK_URL = 'http://localhost:6969'

// posalji podatke
const sendData = async (data) => {
    const odg = await axios.post(FLASK_URL+"/traindata", data)
    return odg;
}

// posalji naziv postojecih podataka
const sendExistingData = async (data) => {
    const odg = await axios.post(FLASK_URL+"/sendexistingdata", data)
    return odg;
}

// dohvati sve spremljene csv
const getData = async () => {
    const odg = await axios.get(FLASK_URL+"/getdata")
    return odg;
}

// izbrisi podatke
const deleteData = async (name) => {
    const odg = await axios.post(FLASK_URL+"/deletedata", name)
    return odg;
}

//dohvati sve nazive modela
const getModel = async () => {
    const odg = await axios.get(FLASK_URL+"/getmodel")
    return odg;
}

//posalji model koji zeli
const sendModel = async (model) => {
    const odg = await axios.post(FLASK_URL+"/sendmodel", model)
    return odg;
}

const saveModel = async (name) => {
    const odg = await axios.post(FLASK_URL+"/savemodel", name)
    return odg;
}
// //dohvati rezultate modela
// const getResult = async() => {
//     const odg = await axios.get(FLASK_URL+"/getresult")
//     return odg;
// }

// treniraj model
const trainModel = async (model) => {
    const odg = await axios.post(FLASK_URL+"/trainmodel", model)
    return odg;
}

//dohvati trenutni smjer
const getDirection = async(data) => {
    const odg = await axios.post(FLASK_URL+"/getdirection", data)
    return odg;
}

export default { sendData, deleteData, sendExistingData, getData, getModel, trainModel, sendModel, saveModel, getDirection }
