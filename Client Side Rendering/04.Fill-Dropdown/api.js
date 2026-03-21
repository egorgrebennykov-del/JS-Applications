const BASE_URL = 'http://localhost:3030/jsonstore/advanced/dropdown';

export async function request(method, data)
{
    let requestOptions;

    if(['put', 'post'].includes(method))
    {
        requestOptions = {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
    }

    const response = await fetch(BASE_URL, {
        method: method.toUpperCase(),
        ...requestOptions
    });

    const responseData = await response.json();
    return responseData || {};
}