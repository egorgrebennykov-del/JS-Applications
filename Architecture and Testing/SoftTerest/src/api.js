const BASE_URL = 'http://localhost:3030/';

export async function request(method, url, data) {
    const options = { method: method.toUpperCase(), headers: {} };

    if(data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const token = sessionStorage.getItem('authToken');
    if(token) {
        options.headers['X-Authorization'] = token;
    }

    const res = await fetch(BASE_URL + url, options);
    if(!res.ok) throw new Error(await res.text());
    return res.status !== 204 ? res.json() : null;
}