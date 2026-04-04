import { html, render } from '../libs/lit-html.js';
import { filmService } from '../services/filmService.js';
import { formService } from '../services/formService.js';

const main = document.querySelector('main');
let filmId = '';

const section = (film) => html`
    <section id="edit-movie" class="view-section">
      <form class="text-center border border-light p-5" @submit=${onSubmit}>
        <h1>Edit Movie</h1>
        <div class="form-group">
          <label for="title">Movie Title</label>
          <input id="title" type="text" class="form-control" placeholder="Movie Title" value="${film.title}" name="title" />
        </div>
        <div class="form-group">
          <label for="description">Movie Description</label>
          <input class="form-control" placeholder="Movie Description..." name="description" id="description" value='${film.description}' />
        </div>
        <div class="form-group">
          <label for="imageUrl">Image url</label>
          <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="img" value='${film.img}'/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </section>`;

export async function editView(id)
{
  filmId = id;
  const film = await filmService.getFilmById(id);
  render(section(film), main);
}

async function onSubmit(e)
{
    const data = formService(e, true);
    if (Object.values(data).some(x => x.trim() === '')) {
        alert('All fields are required!');
        return;
    }

    await filmService.editFilm(filmId, data);
}