import axios from "axios";
import authHeader from './auth-header'
import { users } from '../__mocks__/users' // DELETE

const API_URL = "http://localhost:8080/api/admin/";

// Intoarce lista de useri (fara admini). Formatul trebuie sa fie cel
// din __mocks__/users.js
const getUsers = () => {
    return Promise.resolve(users) // DELETE
    
    return axios
        .get(`${API_URL}users`, {
            ...authHeader()
        })
        .then(res => {
            return res.data
        })
}

// Valideaza un user si intoarce un raspuns de forma { success: true } daca totul e okay
const validateUser = (userId) => {
    return Promise.resolve(true) // DELETE

    return axios
        .post(
            `${API_URL}users`, 
            {
                id: userId
            },
            {
                ...authHeader()
            }
        )
        .then(res => {
            return res.data;
        })
}

export default {
    getUsers,
    validateUser
}