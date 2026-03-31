import { api } from "../api.js";

const BASE_URL = '/data/motorcycles';
const SORTED = '?sortBy=_createdOn%20desc';

async function getAllMoto()
{
    return await api.get(BASE_URL + SORTED);
}

async function getMotoById(id)
{
    return await api.get(`/data/motorcycles/${id}`);
}

async function createMoto(data)
{
    await api.post(BASE_URL, data);
    page('/motorcycles');  
}

async function editMoto(data, id)
{
    return await api.put(`/data/motorcycles/${id}`, data);
}

async function deleteMoto(id)
{
    await api.del(BASE_URL + `/${id}`);
    page('/motorcycles');
}

async function searchMoto(query)
{
    return await api.get(`${BASE_URL}?where=model%20LIKE%20%22${query}%22`);
   //return await api.get(`/data/motorcycles?sortBy=_createdOn%20desc`);
}

//  '/data/motorcycles?sortBy=_createdOn%20desc'

export const motoService = {
    getAllMoto,
    createMoto,
    editMoto,
    deleteMoto,
    searchMoto,
    getMotoById
}