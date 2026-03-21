import { request } from './api.js';

export async function getString()
{
    return await request('get');
}