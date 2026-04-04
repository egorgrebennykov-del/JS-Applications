import { api } from "../api.js"
import { userHelp } from "../utility/userHelp.js";
import { navUpdate } from "../utility/navUpdate.js";
import { gamesService } from "./gamesService.js";

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

async function getRole(id)
{
    let role = '';
    const ownerId = await gamesService.getOwnerId(id);
    const userId = userHelp.getUserId();

    if(ownerId === userId)
    {
        role = 'author';
    } else if(userHelp.isAuthorized())
    {
        role = 'viewer';
    } else {
        role = 'guest';
    }

    return role;
}

export const userService = {
    register,
    login,
    logout,
    getRole
}