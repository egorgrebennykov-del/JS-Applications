import { html, render } from '../libs/lit-html.js';
import { formService } from '../services/formService.js';
import { motoService } from '../services/motoService.js';

const main = document.querySelector('main');

// page.waitForSelector('text=Add Motorcycle')

const createSection = () => html`
        <section id="create">
          <!-- <h2>Add Motorcycle</h2> -->
          <div class="form">
            <h2>Add Motorcycle</h2> 
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
            </form>
          </div>
        </section>`;

export function createView()
{
    render(createSection(), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    if (Object.values(data).some(x => x.trim() === '')) {
    alert('All fields are required!');
    return;
  }

  await motoService.createMoto(data);
}