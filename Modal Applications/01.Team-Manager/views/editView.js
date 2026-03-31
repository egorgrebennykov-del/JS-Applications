import { html, render } from '../libs/lit-html.js';
import { formService } from '../service/formService.js';
import { teamsService } from '../service/teamsServise.js';

const main = document.querySelector('main');
let errorMess = '';
let teamId = '';

const editSection = (team) => html`
            <section id="edit">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form id="edit-form" class="main-form pad-large" @submit=${onSubmit}>
                        <div class="${errorMess ? 'error' : 'hidden'}">${errorMess}</div>
                        <label>Team name: <input type="text" name="name" .value=${team.name}></label>
                        <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
                        <label>Description: <textarea name="description">${team.description}</textarea></label>
                        <input class="action cta" type="submit" value="Save Changes">
                    </form>
                </article>
            </section>`;

export function editView(team)
{
    console.log(team);
    teamId = team._id;
    render(editSection(team), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    const {description, logoUrl, name} = data;
    errorMess = '';

    try{
        if(description.length < 10 || !logoUrl || name.length < 4)
        {
            throw new Error('Incorrect Data');
        }
        const responseData = await teamsService.editTeam({description, logoUrl, name}, teamId);
        console.log(responseData._id);
        page(`/team-home/${responseData._id}`);
    } catch(error) {
        errorMess = error.message;
        render(editSection({ name, logoUrl, description }), main);
    }
}