import { html, render } from '../libs/lit-html.js';
import { teamsService } from '../service/teamsServise.js';
import { userHelp } from '../utility/userHelp.js';
import { membersService } from '../service/membersService.js';
import { editView } from './editView.js';

const main = document.querySelector('main');

const teamHomeSection = (team, role, memberCount, userData, members, pendingMembers) => html`
            <section id="team-home">
                <article class="layout">
                    <img src="${team.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">${memberCount} Members</span>
                        <div>
                            <a class="${role === 'owner' ? 'action' : 'hidden'}" @click=${() => editView(team)}>Edit team</a>
                            <a href="#" class="${role === 'not member' ? 'action' : 'hidden'}" @click=${() => joinTeam(team._id)}>Join team</a>
                            <a href="#" class="${role === 'member' ? 'action invert' : 'hidden'}" @click=${() => teamsService.leaveTeam(userData._id)}>Leave team</a>
                            <p class='${role === 'pending' ? '' : 'hidden'}'>Membership pending. <a @click=${() => teamsService.leaveTeam(userData._id)}>Cancel request</a></p>
                        </div>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            <li class="${role === 'member' ? '' : 'hidden'}">${userData ? userData.username : ''}</li>
                            ${members.filter(m => m.status !== 'pending')
                                    .map(member => html`
                                        <li id="${member.user?._id}">
                                            ${member.user?.username}
                                            <a 
                                                class="${role === 'owner' ? 'tm-control action' : 'hidden'}"
                                                @click=${() => teamsService.leaveTeam(member.user._id)}
                                            >
                                                Remove from team
                                            </a>
                                        </li>
                                    `)}
                        </ul>
                    </div>
                    <div class="${role === 'owner' ? 'pad-large' : 'hidden'}">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                        ${pendingMembers.map(member => html`
                            <li>
                                ${member.user?.username || 'Unknown'}
                                <a class="tm-control action">Approve</a>
                                <a class="tm-control action">Decline</a>
                            </li>
                        `)}
                        </ul>
                    </div>
                </article>
            </section>`;

export async function teamHomeView(ctx)
{
    const id = ctx.params.id;
    if (!id) {
        return;
    }

    const team = await teamsService.getTeamById(id);
    if (!team) {
        render(html`<section id="team-home"><p class="error">Team not found</p></section>`, main);
        return;
    }

    const role = await membersService.memberRole(id);
    const teamMemberCount = await membersService.teamMemberCount(id);
    const userData = userHelp.getUserInfo();
    const members = await teamsService.getTeamMembers(id);
    const pendingMembers = await teamsService.pendingMembers(id);

    render(teamHomeSection(team, role, teamMemberCount, userData, members, pendingMembers), main);
}

async function joinTeam(teamId)
{
    await membersService.joinMember(teamId);
}