import { request } from './api.js';

export async function getItems()
{
    return await request('get');
}

export async function addItemToServer(item)
{
    const itemToAdd = {text: item};
    await request('post', itemToAdd);
}