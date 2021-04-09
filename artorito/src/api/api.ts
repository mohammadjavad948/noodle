import {ENDPOINT} from "../env";

const axios = require('axios').default;

export function status(){
    return axios.get(ENDPOINT + '/status')
}