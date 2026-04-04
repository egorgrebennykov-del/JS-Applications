import { html, render } from '../libs/lit-html.js';
import { gamesService } from '../services/gamesService.js';
import { detailsView } from './detailsView.js';

const main = document.querySelector('main');

const section = (games) => html`
    <h2>Games Collection</h2>
      <section id="retro-games">
        ${games && games.length > 0 ? 
            games.map(game => html`
                <div class="game">
                <img src="${game.imageUrl}" alt="example2" />
                <div class="game-info">
                    <h3 class="game-name">${game.name}</h3>
                    <p class="platform">Platform: ${game.platform}</p>
                    <a class="details-btn" @click=${() => detailsView(game._id)}>See More</a>
                </div>
                </div>`) :
                 html`<h2 id="no-game">No retro games yet, be the first to contribute</h2>`}
      </section>`;

export async function dashboardView()
{
    const games = await gamesService.getAllGames();
    render(section(games), main);
}

//<h2 id="no-game">No retro games yet, be the first to contribute</h2>