import axios from "axios";
import authHeader from './auth-header'
import { documents } from '../__mocks__/documents' // DELETE
import { formular } from '../__mocks__/formular' // DELETE

const API_URL = "http://localhost:8080/api/form/";

// Intoarce lista de useri (fara admini). Formatul trebuie sa fie cel
// din __mocks__/documents.js
const getForms = () => {    
    return axios
        .get(`${API_URL}`, {
            ...authHeader()
        })
        .then(res => {
            return res.data.documents;
        })
}

// Adauga un formular nou. Formatul trimis va fi cel din din __mocks__/formular.js.
// Intoarce { success: true/false }
const addForm = (formData) => {

    return axios
        .post(
            `${API_URL}add`, 
            formData,
            {
                ...authHeader()
            }
        )
        .then(res => {
            return res.data.success;
        })
}

// Modifica un formular existent. Formatul trimis va fi cel din din __mocks__/formular.js
// Intoarce { success: true/false }
const updateForm = (formData, formId) => {

    return axios
        .post(
            `${API_URL}update/${formId}`, 
            formData,
            {
                ...authHeader()
            }
        )
        .then(res => {
            return res.data.success;
        })
}

// Primeste campurile dintr-un formular. Formatul trimis va fi cel din din __mocks__/formular.js
const getFormById = (formId) => {

    return axios
        .get(
            `${API_URL}${formId}`, 
            {
                ...authHeader()
            }
        )
        .then(res => {
            return res.data;
        })
}

// Intoarce { success: true/false }
const deleteFormById = (formId) => {

    return axios
        .delete(
            `${API_URL}${formId}`, 
            {
                ...authHeader()
            }
        )
        .then(res => {
            return res.data.success;
        })
}

// Genereaza un tabel dintr-un formular. Trebuie sa intoarca inapoi un excel.
// Pe asta nu am cum sa o testez, va trebui sa vedem dupa ce o implementati
const generateForm = (formId) => {
    return axios
        .get(
            `${API_URL}generate/${formId}`, 
            {
                ...authHeader()
            }
        )
        .then(res => {
            return res.data;
        })
}

export default {
    getForms,
    addForm,
    getFormById,
    updateForm,
    generateForm,
    deleteFormById,
}