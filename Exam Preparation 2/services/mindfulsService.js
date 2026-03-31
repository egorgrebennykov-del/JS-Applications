import { api } from "../api.js"

const endpoints = {
    forDashboard: '/data/mindfultips?sortBy=_createdOn%20desc',
    BASE_URL: '/data/mindfultips'
}

async function getForDashboard()
{
    return await api.get(endpoints.forDashboard);
}

async function createMindful(data)
{
    return await api.post(endpoints.BASE_URL, data);
}

async function getMindful(id)
{
    return await api.get(endpoints.BASE_URL + `/${id}`);
}

async function editMindful(data, id)
{
    return api.put(endpoints.BASE_URL + `/${id}`, data);
}

async function deleteMindful(id)
{
    return api.del(endpoints.BASE_URL + `/${id}`);
}

export const mindfulsService = {
    getForDashboard,
    createMindful,
    getMindful,
    editMindful,
    deleteMindful
}
