import { html, render } from '../libs/lit-html.js';
import { formService } from '../services/formService.js';
import { gamesService } from '../services/gamesService.js';

const main = document.querySelector('main');

const section = () => html`
      <section id="create">
        <div class="form">
          <h2>Add Retro Game</h2>
          <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="game-name" id="game-name" placeholder="Game Name" />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
            <input type="text" name="platform" id="platform" placeholder="Platform" />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
            <textarea  id="release-date"  name="release-date" placeholder="Release Date"></textarea>
            <button type="submit">Add Game</button>
          </form>
        </div>
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

    const gameData = {
        name: data['game-name'],
        imageUrl: data['image-url'],
        platform: data.platform,
        description: data.description,
        releaseDate: data['release-date']
    };

    await gamesService.createGame(gameData);
}