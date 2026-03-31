import { api } from "../api.js";
import { userHelp } from "../utility/userHelp.js";
import { navUpdate } from "../utility/navUpdate.js";

const endpoints = {
    register: '/users/register',
    login: '/users/login'
}

async function registration(data)
{
    const userInfo = await api.post(endpoints.register, data);
    const { email, password, username, _id, accessToken } = userInfo;
    userHelp.setUser({ email, password, username, _id, accessToken });
    navUpdate();
    page('/my-teams');
}

async function login(data)
{
    const userInfo = await api.post(endpoints.login, data);
    const { email, password, username, _id, accessToken } = userInfo;
    userHelp.setUser({ email, password, username, _id, accessToken });
    navUpdate();
    page('/my-teams');
}

function logout() {
    userHelp.clearUser();
    navUpdate();
    page('/home');
}

let usersRoles = {
    owners: [],
    members: []
}

export const userService = {
    registration,
    login,
    logout
}