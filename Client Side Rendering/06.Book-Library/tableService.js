import { request } from './api.js';

export async function getStrings()
{
    return request('get');
}

export async function addBookInServer(data)
{
    const title = data.title;
    const author = data.author;

    if(!title || !author)
    {
        throw new Error('Incorrect Data');
    }
    await request('post', data);
}

export async function editBookInServer(data, id)
{
    const title = data.title;
    const author = data.author;

    if(!title || !author)
    {
        throw new Error('Incorrect Data');
    }

    await request('put', data, id);
}

export async function getOneBook(id)
{
    return await request('get', null, id);
}

export async function deleteBookFromServer(id)
{
    await request('delete', null, id)
}