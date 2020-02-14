import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://group19-api.herokuapp.com/api';
const http = axios.create({
    baseURL: BASE_URL,
    responseType: "json"
})
function getHeaders(secure = true) {
    let headers
    if (secure) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }

    }
    else {
        headers = {
            'Content-Type': 'application/json'
        }
    }
    return headers;
}


function get(url, isSecure) {
    return http.get(
        url,
        {
            headers: getHeaders(isSecure)
        }
    )
}
function post(url, data, isSecure) {
    return http.post(
        url,
        data,
        {
            headers: getHeaders(isSecure)
        }
    )
}
function remove(url, isSecure) {
    return http.delete(
        url,
        {
            headers: getHeaders(isSecure)
        }
    )
}
function put(url, data, isSecure) {
    return http.put(
        url,
        data,
        {
            headers: getHeaders(isSecure)
        }
    )
}
function upload({ url, method, files, data }) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        if (files && files.length) {
            formData.append('img', files[0], files[0].name);
        }
        for (let key in data) {
            formData.append(key, data[key]);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                    console.log("sssss",xhr.response)
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open(method, url,  true)
        xhr.send(formData);
    })

}


export default {
    get, post, put, delete: remove,upload
}
