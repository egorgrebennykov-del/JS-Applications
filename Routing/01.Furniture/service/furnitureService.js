import { api } from '../api.js';

const BASE_URL = 'http://localhost:3030/data/catalog';

async function getFurniture(idOrQuery) {
    if (idOrQuery && idOrQuery.startsWith('?')) {
        return await api.get(BASE_URL + `/${idOrQuery}`);
    }
    if (idOrQuery) {
        return await api.get(`${BASE_URL}/${idOrQuery}`);
    }
    return await api.get(BASE_URL);
}

async function editFurniture(data, id)
{
    return await api.put(BASE_URL + `/${id}`, data);
}

async function createFurniture(data)
{
    await api.post(BASE_URL, data);
}

async function deleteFurniture(id)
{
    await api.del(BASE_URL + `/${id}`);
}

export const furnitureService = {
    getFurniture,
    editFurniture,
    createFurniture,
    deleteFurniture
};