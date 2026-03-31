import { html, render } from '../libs/lit-html.js';
import { mindfulsService } from '../services/mindfulsService.js';
import { formService } from '../services/formService.js';
import { showError } from '../utility/notify.js';

const main = document.querySelector('main');

const section = () => html`
      <section id="create">
        <div class="form form-item">
          <h2>Share Your Tip</h2>
          <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="title" id="title" placeholder="Title" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="text" name="type" id="type" placeholder="Type" />
            <select name="difficulty" id="difficulty">
              <option value="" disabled selected>Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="50"></textarea>
            <button type="submit">Add</button>
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
        showError('All fields are required!');
        return;
    }

    try {
        await mindfulsService.createMindful(data);
        page('/mindful-tipes');
    } catch (err) {
        showError(err.message);
    }
}