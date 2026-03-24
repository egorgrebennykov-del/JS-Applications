import { userHelp } from "./src/utilies/userHelp.js";

async function request(method, data, url)
{
    let options = { method, headers: {} };

    if(data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if(userHelp.isAuthorized())
    {
        options.headers['X-Authorization'] = userHelp.getAccessToken();
    }

    try{
        const response = await fetch(url, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch(error)
    {
        alert(error.message);
        throw error;
    }
}

async function get(url)
{
    return await request('GET', null, url);
}

async function post(url, data)
{
    return await request('POST', data, url);
}

async function put(url, data)
{
    return await request('PUT', data, url);
}

async function del(url)
{
    return await request('DELETE', null, url);
}

export const api = {
    get,
    post,
    put,
    del
};