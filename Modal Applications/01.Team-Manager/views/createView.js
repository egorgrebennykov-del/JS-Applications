import { html, render } from '../libs/lit-html.js';
import { formService } from '../service/formService.js';
import { teamsService } from '../service/teamsServise.js';

const main = document.querySelector('main');
let errorMess = '';

const createSection = () => html`
            <section id="create">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>New Team</h1>
                    </header>
                    <form id="create-form" class="main-form pad-large" @submit=${onSubmit}>
                        <div class="${errorMess ? 'error' : 'hidden'}">${errorMess}</div>
                        <label>Team name: <input type="text" name="name"></label>
                        <label>Logo URL: <input type="text" name="logoUrl"></label>
                        <label>Description: <textarea name="description"></textarea></label>
                        <input class="action cta" type="submit" value="Create Team">
                    </form>
                </article>
            </section>`;

export function createView()
{
    render(createSection(), main);
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
        const data = await teamsService.createTeam({description, logoUrl, name});

        page(`/team-home/${data._id}`);
    } catch(error) {
        errorMess = error.message;
        render(createSection(), main);
    }
}