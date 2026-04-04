import { html, render } from '../libs/lit-html.js';
import { filmService } from '../services/filmService.js';
import { userHelp } from '../utility/userHelp.js';
import { detailsView } from './detailsView.js';

const main = document.querySelector('main');

const section = (films) => html`
    <section id="home-page" class="view-section">
      <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40">
        <img src="/images/cropped-movie-banner-e1408372575210.jpg" class="img-fluid" alt="Responsive image"/>
        <h1 class="display-4">Movies</h1>
        <p class="lead">
          Unlimited movies, TV shows, and more. Watch anywhere. Cancel
          anytime.
        </p>
      </div>

      <h1 class="text-center">Movies</h1>

      <section id="add-movie-button" class='${userHelp.getUserData() ? 'user' : 'hidden'}'>
        <a href="/create" class="btn btn-warning">Add Movie</a>
      </section>

      <section id="movie">
        <div class="mt-3">
          <div class="row d-flex d-wrap">
            <ul id="movies-list" class="card-deck d-flex justify-content-center">
              <!-- list item example -->
              ${films.map(film => html`
                <li class="card mb-4">
                <img class="card-img-top" src="${film.img}" alt="Card image cap" width="400" />
                <div class="card-body">
                  <h4 class="card-title">${film.title}</h4>
                  <a href="#">
                  </a>
                </div>
                <div class="card-footer">
                  <button type="button" class="btn btn-info" @click=${() => detailsView(film._id)}>Details</button>
                </div>
              </li>`)}
            </ul>
          </div>
        </div>
      </section>
    </section>`;

export async function homeView()
{
  const films = await filmService.getAllFilms();
  render(section(films), main);
}