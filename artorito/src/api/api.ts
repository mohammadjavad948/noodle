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

export function allLabels(token: string){
    return axios.get(ENDPOINT + '/label', {
       headers: {
           token
       }
    });
}

export function createLabel(token: string, name: string, color: string){
    return axios.post(ENDPOINT + '/label', {name, color},  {
        headers: {
            token
        }
    });
}

export function removeLabel(token: string, id: string){
    return axios.delete(ENDPOINT + '/label/' + id,  {
        headers: {
            token
        }
    });
}

export function createTime(token: string, time: number, label: string){
    return axios.post(ENDPOINT + '/time/new', {time, label},  {
        headers: {
            token
        }
    });
}