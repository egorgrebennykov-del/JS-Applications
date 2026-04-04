import { html, render } from '../libs/lit-html.js';
import { gamesService } from '../services/gamesService.js';
import { formService } from '../services/formService.js';

const main = document.querySelector('main');
let gameId = '';

const section = (game) => html`
      <section id="edit">
        <div class="form">
          <h2>Edit Retro Game</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="game-name" id="game-name" placeholder="Game Name" value='${game.name}'/>
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" value='${game.imageUrl}'/>
            <input type="text" name="platform" id="platform" placeholder="Platform" value='${game.platform}'/>
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${game.description}</textarea>
            <textarea  id="release-date"  name="release-date" placeholder="Release Date">${game.releaseDate}</textarea>
            <button type="submit">Edit Game</button>
          </form>
        </div>
      </section>`;

export async function editView(id)
{
  gameId = id;
  const game = await gamesService.getGameById(id);
  render(section(game), main);
}

async function onSubmit(e)
{
    const data = formService(e);

    if (Object.values(data).some(x => x.trim() === '')) {
        alert('All fields are required!');
        return;
    }

    const gameData = {
        name: data['game-name'],
        imageUrl: data['image-url'],
        platform: data.platform,
        description: data.description,
        releaseDate: data['release-date']
    };

    await gamesService.editGame(gameId, gameData);
}