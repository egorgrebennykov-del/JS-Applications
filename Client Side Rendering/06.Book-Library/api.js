const BASE_URL = 'http://localhost:3030/jsonstore/collections/books';

export async function request(method, data, id) {
    let requestSettings;
    let linkSettings = '';

    if(id) {
        linkSettings = `/${id}`;
    }

    if(['put', 'post'].includes(method)) {
        requestSettings = {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
    }

    const response = await fetch(BASE_URL + linkSettings, {
        method: method.toUpperCase(),
        ...requestSettings
    });

    // Проверка на успешный ответ
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
    }

    // Если тело пустое, не вызывать response.json()
    const text = await response.text();
    return text ? JSON.parse(text) : {};
}