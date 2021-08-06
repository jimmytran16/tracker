const axios = require('axios')

const registerUser = (username, password, name) => {
    return axios({
        method: 'POST',
        url: 'http://localhost:4000/auth/register',
        data: {
            "name": name,
            "username": username,
            "password":password
        }
    });
}

module.exports = { registerUser };