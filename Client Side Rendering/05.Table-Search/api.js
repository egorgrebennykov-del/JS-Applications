const BASE_URL = 'http://localhost:3030/jsonstore/advanced/table';

export async function request(method, data)
{
    let requestSettings;

    if(['post', 'put'].includes(method))
    {
        requestSettings = {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
    }

    const response = await fetch(BASE_URL, {
        method: method.toUpperCase(),
        ...requestSettings
    });

    const responseData = await response.json();
    return responseData || {};
}