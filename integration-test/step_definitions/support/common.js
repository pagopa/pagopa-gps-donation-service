const axios = require("axios");
const fs = require('fs');

let rawdata = fs.readFileSync('./config/properties.json');
let properties = JSON.parse(rawdata);
const donation_service_host = properties.donation_service_host;

function get(url) {
    return axios.get(donation_service_host + url)
         .then(res => {
             return res;
         })
         .catch(error => {
             return error.response;
         });
}

function post(url, body) {
    return axios.post(donation_service_host + url, body)
        .then(res => {
            return res;
        })
        .catch(error => {
            return error.response;
        });
}

function randomAmount() {
    return (Math.round(Math.random() * 89999999) + 10000000);
}

function randomDesc() {
    return "Desc_" + Math.floor(Math.random() * 100);
}

module.exports = {get, post, randomAmount, randomDesc}
