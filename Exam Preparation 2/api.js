import { userHelp } from "./utility/userHelp.js";

const BASE_URL = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const token = userHelp.getAccessToken();
    if (token) {
        options.headers['X-Authorization'] = token;
    }

    const response = await fetch(BASE_URL + url, options);

    let result;

    try {
        result = await response.json();
    } catch {
        result = null;
    }

    if (!response.ok) {
        throw new Error(result?.message || 'Request failed');
    }

    return result;
}

async function get(url) {
    return request('GET', url);
}

async function post(url, data) {
    return request('POST', url, data);
}

async function put(url, data) {
    return request('PUT', url, data);
}

async function del(url) {
    return request('DELETE', url);
}

export const api = {
    get,
    post,
    put,
    del
};