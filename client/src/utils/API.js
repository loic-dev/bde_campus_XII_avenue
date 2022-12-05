import axios from "axios";
var sendHeaderToken = "Bearer "+sessionStorage.getItem("token");


export const url = "https://loic-dev-urban-space-rotary-phone-vrjrqrwg4w9hxvjx-8000.preview.app.github.dev/";


export function auth(){
    return axios.get(`${url}api/auth`,  {headers:{
        "Content-Type": "application/json",
        "authorization": sendHeaderToken,
    }});
}

export function loginAPI(send){
    return axios.post(`${url}api/login`, send,{});
}

export function signupAPI(send){
    return axios.post(`${url}api/register`, send,{});
}

export function getPartnersAPI(){
    return axios.get(`${url}api/partners`);
}

export function getPanelsAPI(){
    return axios.get(`${url}api/panels`);
}

export function getNextEventAPI(){
    return axios.get(`${url}api/event/next`);
}





