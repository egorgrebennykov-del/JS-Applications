import { api } from '../api.js'
import { userHelp } from '../utility/userHelp.js';
import { teamsService } from './teamsServise.js';

async function joinMember(teamId)
{
    await api.post('/data/members', {teamId});
}

async function memberRole(id)
{
    let role;
    const team = await teamsService.getTeamById(id);
    const members = await teamsService.getTeamMembers(id);
    const userData = userHelp.getUserInfo();
    if (!userData) {
        role = 'guest';
    } else if (team._ownerId === userData._id) {
        role = 'owner';
    } else {
        const membership = members.find(m => m.user?._id === userData._id);

        if (!membership) {
            role = 'not member';
        } else if (membership.status === 'pending') {
            role = 'pending';
        } else if (membership.status === 'member') {
            role = 'member';
        }
    }

    return role;
}

async function teamMemberCount(id)
{
    const members = await teamsService.getTeamMembers(id);
    return members.filter(m => m.status === 'member').length;
}

async function leaveTeam(id)
{
    await api.del(`/data/members/${id}`);
    page('/home');
}

export const membersService = {
    joinMember,
    memberRole,
    teamMemberCount,
    leaveTeam
}