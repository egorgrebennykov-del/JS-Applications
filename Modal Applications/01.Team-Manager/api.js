import { userHelp } from "./utility/userHelp.js";

const BASE_URL = 'http://localhost:3030';

async function request(method, url, data)
{
    const requestSettings = {
        method,
        headers: {}
    };

    if(['PUT', 'POST'].includes(method))
    {
        requestSettings.headers['Content-Type'] = 'application/json';
        requestSettings.body = JSON.stringify(data);
    }

    if(userHelp.getUserInfo())
    {
        requestSettings.headers['X-Authorization'] = userHelp.getAccessToken();
    }

    const response = await fetch(BASE_URL + url, {
        method: method,
        ...requestSettings
    });

    if(!response.ok)
    {
        let errorMessage = 'Error';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || 'Error';
        } catch (e) {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData || {};
}

async function get(url)
{
    return request('GET', url);
}

async function post(url, data)
{
    return request('POST', url, data);
}

async function put(url, data)
{
    return request('PUT', url, data);
}

async function del(url)
{
    return request('DELETE', url);
}

export const api = {
    get,
    post,
    put,
    del
};