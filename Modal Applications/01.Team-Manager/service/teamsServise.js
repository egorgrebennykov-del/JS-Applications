import { api } from "../api.js";

const BASE_URL = '/data/teams/';

async function getTeams()
{
    const teamsObj = await api.get(BASE_URL);
    return Object.values(teamsObj);
}

async function getTeamById(id)
{
    if (!id) {
        throw new Error('Team id is required');
    }
    return await api.get(`${BASE_URL}${id}`);
}

async function getTeamMembers(id)
{
    return await api.get(`/data/members?where=teamId%3D%22${id}%22&load=user%3D_ownerId%3Ausers`);
}

async function teamsMembers()
{
    return await api.get('/data/members?where=status%3D%22member%22');
}

async function pendingMembers(teamId) {
        const allPending = await api.get('/data/members?where=status%3D%22pending%22');
        const teamPending = allPending.filter(m => m.teamId === teamId);
        let allUsers = teamPending.map(member => getUserById(member._ownerId));
        console.log(allUsers);
        return allUsers;
}

async function getUserById(userId) {
    const user = await api.get(`/users/${userId}`);
    return user;
}


async function createTeam(data)
{
    return api.post('/data/teams', data)
}

async function editTeam(data, id)
{
    return api.put(`/data/teams/${id}`, data);
}

export const teamsService = {
    getTeams,
    getTeamById,
    getTeamMembers,
    teamsMembers,
    pendingMembers,
    createTeam,
    editTeam,
};