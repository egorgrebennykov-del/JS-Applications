import { request } from './api.js';

export function isAuthorised()
{
    return sessionStorage.getItem('isLoggedIn');
}

export async function registerUserInServer(data) {
    if(data.email.length < 3 || data.password.length < 3 || data.password !== data.repeatPassword) {
        throw new Error('Invalid Data');
    }

    const userData = { email: data.email, password: data.password };
    const res = await request('post', 'users/register', userData);

    setUser({ email: res.email, _id: res._id }, res.accessToken);
}

export async function loginInServer(userData) {
    const res = await request('post', 'users/login', userData);
    setUser({ email: res.email, _id: res._id }, res.accessToken);
}

export function logoutFromServer()
{
    sessionStorage.clear();
}

function setUser(userData, token)
{
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('isLoggedIn', 'true');
}