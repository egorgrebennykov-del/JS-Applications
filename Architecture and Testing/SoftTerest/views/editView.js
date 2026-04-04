import { html, render } from '../libs/lit-html.js';
//import { formService } from '../services/formService.js';

const main = document.querySelector('main');

const section = () => html`
    <section id="edit-movie" class="view-section">
      <form class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
          <label for="title">Movie Title</label>
          <input id="title" type="text" class="form-control" placeholder="Movie Title" value="" name="title" />
        </div>
        <div class="form-group">
          <label for="description">Movie Description</label>
          <input class="form-control" placeholder="Movie Description..." name="description" id="description" />
        </div>
        <div class="form-group">
          <label for="imageUrl">Image url</label>
          <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" value="" name="img" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </section>`;

export async function editView(id)
{
    render(section(), main);
}

/*async function onSubmit(e)
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
}*/