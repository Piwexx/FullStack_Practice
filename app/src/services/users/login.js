import axios from "axios";

export const login = (username,password)=> {
    return  axios.post('/api/v1/user/login', {
        username,
        password
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error en la solicitud');
        }
    })
}