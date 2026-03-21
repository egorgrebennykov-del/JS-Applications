import { html, render } from './lit-html.js';

const form = document.querySelector('form');
form.addEventListener('submit', loadTowns);

async function loadTowns(e)
{
    e.preventDefault();
    const root = document.getElementById('root');
    const formData = new FormData(e.target);

    form.reset();

    if(!formData.get('towns'))
    {
        return;
    }

    const townList = formData.get('towns').split(',').map(town => town.trim());
    const townListHTML = html`<ul>${townList.map((town) => html`<li>${town}</li>`)}</ul>`;

    render(townListHTML, root);
}