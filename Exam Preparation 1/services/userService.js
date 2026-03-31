import { api } from "../api.js"
import { userHelp } from "../utilities/userHelp.js";
import { navUpdate } from "../utilities/navUpdate.js";

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout'

    
}

async function register(data)
{
    const userInfo = await api.post(endpoints.register, data);
    const {email, password, accessToken} = userInfo;
    userHelp.setUser({email, password, accessToken});
    page('/home');
}

async function login(data)
{
    const userInfo = await api.post(endpoints.login, data);
    const {email, _id, accessToken} = userInfo;
    userHelp.setUser({email, _id, accessToken});
    navUpdate();
    page('/');
}

async function logout()
{
    await api.get(endpoints.logout);
    userHelp.clearUser();
    navUpdate();
    page('/home');
}

export const userService = {
    register,
    login,
    logout
}