import {ENDPOINT} from "../env";

const axios = require('axios').default;

export function status(){
    return axios.get(ENDPOINT + '/status')
}

export function login(username: string, password: string){
    return axios.post(ENDPOINT + '/login', {username, password});
}

export function register(username: string, password: string, name: string){
    return axios.post(ENDPOINT + '/register', {username, password, name});
}