import axios from "axios";
var sendHeaderToken = "Bearer "+sessionStorage.getItem("token");


const url = "https://loic-dev-urban-space-rotary-phone-vrjrqrwg4w9hxvjx-8000.preview.app.github.dev/api";


export function auth(){
    return axios.get(`${url}/auth`,  {headers:{
        "Content-Type": "application/json",
        "authorization": sendHeaderToken,
    }});
}

export function loginAPI(send){
    return axios.post(`${url}/login`, send,{});
}

export function signupAPI(send){
    return axios.post(`${url}/register`, send,{});
}


