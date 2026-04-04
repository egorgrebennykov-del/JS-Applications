import { userHelp } from "./utility/userHelp.js";

const BASE_URL = 'http://localhost:3030';

async function request(method, url, data)
{
    let requestSettings = {
        headers: {},
    };

    if(['POST', 'PUT'].includes(method))
    {
        requestSettings.headers['Content-Type'] = 'application/json';
        requestSettings.body = JSON.stringify(data);
    }

    if(userHelp.getAccessToken())
    {
        requestSettings.headers['X-Authorization'] = userHelp.getAccessToken();
    }

    const response = await fetch(BASE_URL + url, {
        method: method,
        ...requestSettings
    });

    if(!response.ok)
    {
        alert('Error');
        return;
    }

    let responseData;
    try {
        responseData = await response.json();
    } catch {
        responseData = {};
    }
    return responseData;
}

async function get(url)
{
    return await request('GET', url);
}

async function post(url, data)
{
    return await request('POST', url, data);
}

async function put(url, data)
{
    return await request('PUT', url, data);
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