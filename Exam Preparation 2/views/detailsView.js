import { html, render } from '../libs/lit-html.js';
import { mindfulsService } from '../services/mindfulsService.js';
import { userHelp } from '../utility/userHelp.js';
import { editView } from './editView.js';

const main = document.querySelector('main');

const section = (mindful, role) => html`
      <section id="details">
        <div id="details-wrapper">
          <div>
            <img id="details-img" src="${mindful.imageUrl}" alt="example1" />
            <p id="details-title">${mindful.title}</p>
          </div>
          <div id="info-wrapper">
            <div id="details-description">
              <p class="details-type">Type: ${mindful.type}</p>
              <p class="details-difficulty">
                Difficulty: ${mindful.difficulty}
              </p>
              <p id="tip-description">${mindful.description}</p>
            </div>
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons" class='${role === 'author' ? '' : 'hidden'}'>
              <a @click=${() => editView(mindful._id)} id="edit-btn">Edit</a>
              <a @click=${() => del(mindful._id)} id="delete-btn">Delete</a>
            </div>
          </div>
        </div>
      </section>`;

export async function detailsView(id)
{
    const mindful = await mindfulsService.getMindful(id);
    const role = userHelp.getUserId() === mindful._ownerId ? 'author' : 'guest';
    render(section(mindful, role), main);
}

async function del(id)
{
    if (confirm("Are you sure?")) {
        await mindfulsService.deleteMindful(id);
        page('/mindful-tipes');
    }
}