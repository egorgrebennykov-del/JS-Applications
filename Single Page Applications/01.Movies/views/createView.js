import { html, render } from '../libs/lit-html.js';
import { filmService } from '../services/filmService.js';
import { formService } from '../services/formService.js';

const main = document.querySelector('main');

const section = () => html`
    <section id="add-movie" class="view-section">
      <form id="add-movie-form" class="text-center border border-light p-5" @submit=${onSubmit}>
        <h1>Add Movie</h1>
        <div class="form-group">
          <label for="title">Movie Title</label>
          <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="" />
        </div>
        <div class="form-group">
          <label for="description">Movie Description</label>
          <input class="form-control" placeholder="Description" name="description" id="description" />
        </div>
        <div class="form-group">
          <label for="imageUrl">Image url</label>
          <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="img" value="" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </section>`;

export function createView()
{
    render(section(), main);
}

async function onSubmit(e)
{
    const data = formService(e);

    if (Object.values(data).some(x => x.trim() === '')) {
        alert('All fields are required!');
        return;
    }

    // extra safety for test reliability (no post if fields are still empty)
    if (!data.title || !data.description || !data.img) {
        return;
    }

    await filmService.createFilm(data);
}