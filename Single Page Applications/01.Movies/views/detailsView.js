import { html, render } from '../libs/lit-html.js';
import { filmService } from '../services/filmService.js';
import { userHelp } from '../utility/userHelp.js';
import { editView } from './editView.js';

const main = document.querySelector('main');

const section = (film, role) => html`
        <section id="movie-example" class="view-section">
      <div class="container">
        <div class="row bg-light text-dark">
          <h1>Movie title: ${film.title}</h1>
          <div class="wrapper">
            <div class="col-md-8">
              <img class="img-thumbnail" src="${film.img}" alt="Movie" />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>${film.description}</p>
              <a class='${role === 'author' ? 'btn btn-danger' : 'hidden'}' @click=${() => filmService.deleteFilm(film._id)}>Delete</a>
              <a class='${role === 'author' ? 'btn btn-warning' : 'hidden'}' @click=${() => editView(film._id)}>Edit</a>
              <a class="btn btn-primary" @click=${filmService.likeFilm}>Like</a>
              <span class="enrolled-span">Liked 1</span>
            </div>
          </div>
        </div>
      </div>
    </section>`;

export async function detailsView(id)
{
    const film = await filmService.getFilmById(id);
    const role = await filmService.getRole(id);
    render(section(film, role), main);
}