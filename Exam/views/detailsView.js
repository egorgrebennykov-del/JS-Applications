import { html, render } from '../libs/lit-html.js';
import { gamesService } from '../services/gamesService.js';
import { userService } from '../services/userService.js';
import { editView } from './editView.js';

const main = document.querySelector('main');

const section = (game, role, likesQty, isLiked) => html`
        <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src="${game.imageUrl}" alt="example1" />
          <div>
            <div id="info-wrapper">
              <p id="game-details-name">${game.name}</p>
              <div id="details-description">
                <p id="details-release-date">Release Date: ${game.releaseDate}</p>
                <p id="description">${game.description}</p>
              </div>
              <h3>Game Likes:<span id="like">${likesQty}</span></h3>
              <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
                <a id="edit-btn" class='${role === 'author' ? '' : 'hidden'}' @click=${() => editView(game._id)}>Edit</a>
                <a id="delete-btn" class='${role === 'author' ? '' : 'hidden'}' @click=${() => gamesService.deleteGame(game._id)}>Delete</a>

                <!--Bonus - Only for logged-in users ( not authors )-->
                ${role === 'viewer' && isLiked == 0 ? html`<a id="like-btn" @click=${async () => await gamesService.likeGame(game._id)}>Like</a>` : ''}
              </div>
            </div>
          </div>
        </div>
      </section>`;

export async function detailsView(id)
{
  const game = await gamesService.getGameById(id);
  const role = await userService.getRole(id);
  const likesQty = await gamesService.likesQty(id);
  const isLiked = await gamesService.isAlreadyLiked(id);
  render(section(game, role, likesQty, isLiked), main);
}