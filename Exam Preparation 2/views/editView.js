import { html, render } from '../libs/lit-html.js';
import { formService } from '../services/formService.js';
import { mindfulsService } from '../services/mindfulsService.js';
import { detailsView } from './detailsView.js';
import { showError } from '../utility/notify.js';

const main = document.querySelector('main');
let mindfulId = '';

const section = (mindful) => html`
      <section id="edit">
        <div class="form form-item">
          <h2>Edit Your Item</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="title" id="title" placeholder="Title" value='${mindful.title}'/>
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" value='${mindful.imageUrl}'/>
            <input type="text" name="type" id="type" placeholder="Type" value='${mindful.type}'/>
            <select name="difficulty" id="difficulty">
              <option value="">Select difficulty</option>
              <option value="Easy" ?selected=${mindful.difficulty === 'Easy'}>Easy</option>
              <option value="Medium" ?selected=${mindful.difficulty === 'Medium'}>Medium</option>
              <option value="Hard" ?selected=${mindful.difficulty === 'Hard'}>Hard</option>
            </select>
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="50">${mindful.description}</textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>`;

export async function editView(id)
{
    const mindful = await mindfulsService.getMindful(id);
    mindfulId = mindful._id;
    render(section(mindful), main);
}

async function onSubmit(e)
{
    const data = formService(e, true);
    if (Object.values(data).some(x => x.trim() === '')) {
        showError('All fields are required!');
        return;
    }

  try {
        await mindfulsService.editMindful(data, mindfulId);
        e.target.reset();
        detailsView(mindfulId);
    } catch (err) {
        showError(err.message);
    }
}