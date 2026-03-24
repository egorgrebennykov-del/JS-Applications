import { api } from '../api.js';
import { userHelp } from '../src/utilies/userHelp.js';
import page from '../libs/page.mjs';

const endpoints = {
    registration: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout'
};

async function register(data)
{
    const userData = await api.post(endpoints.registration, data);
    userHelp.setUser(userData);
    page.redirect('/dashboard');
}

async function login(data) {
    const userData = await api.post(endpoints.login, data);
    userHelp.setUser(userData);
    page.redirect('/dashboard');
}

async function logout()
{
    await api.get(endpoints.logout);
    userHelp.clearUser();
    page.redirect('/dashboard');
}

export const userService = {
    register,
    login,
    logout
}