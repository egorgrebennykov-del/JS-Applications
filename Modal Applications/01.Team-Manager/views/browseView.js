import { html, render } from '../libs/lit-html.js';
import { teamsService } from '../service/teamsServise.js';
import { userHelp } from '../utility/userHelp.js';
import { teamHomeView } from './teamHomeView.js';

const main = document.querySelector('main');

const browseSection = (teams, members) => 
    html` <section id="browse">

                <article class="pad-med">
                    <h1>Team Browser</h1>
                </article>

                <article class='${userHelp.isAuthorized() ? 'layout narrow' : 'hidden'}'>
                    <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
                </article>

                ${teams.map(team => {
                    const teamMembers = members.filter(member => member.teamId === team._id).length;
                    return html` <article class="layout">
                    <img src="${team.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">${teamMembers} Members</span>
                        <div><a href="/team-home/${team._id}" class="action">See details</a></div>
                    </div>
                </article>`;
                })}
            </section>`;

export async function browseView()
{
    const members = await teamsService.teamsMembers();
    const teams = await teamsService.getTeams();
    render(browseSection(teams, members), main);
}

/*description
: 
"These ARE the droids we're looking for"
logoUrl
: 
"/assets/atat.png"
name
: 
"Storm Troopers"
_createdOn
: 
1615737591748
_id
: 
"34a1cab1-81f1-47e5-aec3-ab6c9810efe1"
_ownerId
: 
"35c62d76-8152-4626-8712-eeb96381bea8"*/