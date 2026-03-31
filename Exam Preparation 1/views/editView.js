import { html, render } from '../libs/lit-html.js';
import { formService } from '../services/formService.js';
import { motoService } from '../services/motoService.js';

const main = document.querySelector('main');
export let motoId = '';

const editSection = (moto) => html`
        <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onSubmit}>
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  value="${moto.model}"
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  value="${moto.imageUrl}"
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                value="${moto.year}"
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              value="${moto.mileage}"
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              value="${moto.contact}"
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
              >${moto.about}</textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>`;

export async function editView(id)
{
    motoId = id;
    const moto = await motoService.getMotoById(id);
    render(editSection(moto), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    if (Object.values(data).some(x => x.trim() === '')) {
        alert('All fields are required!');
        return;
    }

    await motoService.editMoto(data, motoId);
    page('/motorcycles');
    motoId = '';
}