import { request } from "../api.js";

export async function getIdeasFromServer()
{
    const response = await request('get', 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
    return response;
}

export async function getOneIdeaFromServer(id)
{
    const response = await request('get', `data/ideas/${id}`);
    return response;
}

export async function deleteIdeaFromServer(id)
{
    await request('delete', `data/ideas/${id}`);
}

export async function createIdeaOnServer(data)
{
    await request('post', 'data/ideas', data);
}