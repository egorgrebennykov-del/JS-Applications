import { html, render } from '../libs/lit-html.js';
import { motoService } from '../services/motoService.js';
import { userHelp } from '../utilities/userHelp.js';
import { editView } from './editView.js';
import { motoId } from './editView.js';

const main = document.querySelector('main');
let role = '';

const detailsSection = (moto) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${moto.imageUrl}" alt="example1" />
            <p id="details-title">${moto.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${moto.year}</p>
                <p class="mileage">Mileage: ${moto.mileage} km.</p>
                <p class="contact">Contact Number: ${moto.contact}</p>
                   <p id = "motorcycle-description">${moto.about}</p>
              </div>
               <!--Edit and Delete are only for creator-->
               ${role === 'author' ? 
                    html`<div id="action-buttons">
                        <a id="edit-btn" @click=${() => editView(moto._id)}>Edit</a>
                        <a id="delete-btn" @click=${() => motoService.deleteMoto(moto._id)}>Delete</a>
                    </div>`: null}
            </div>
        </div>
      </section>`;

export async function detailsView(id)
{
    const userId = userHelp.getUserId();
    const moto = await motoService.getMotoById(motoId ? motoId: id);
    role = userId === moto._ownerId ? 'author' : 'guest';
    render(detailsSection(moto), main);
}