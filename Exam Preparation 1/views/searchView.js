import { html, render } from '../libs/lit-html.js';
import { formService } from '../services/formService.js';
import { motoService } from '../services/motoService.js';
import { detailsView } from './detailsView.js';

const main = document.querySelector('main');

const searchSection = (searchedItems) => html`
    <section id="search">

        <div class="form">
          <h4>Search</h4>
          <form class="search-form" @submit=${onSubmit}>
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button class="button-list">Search</button>
          </form>
        </div>
        ${searchedItems && searchedItems.length > 0
    ? html`
        <h4 id="result-heading">Results:</h4>
        <div class="search-result">
            ${searchedItems.map(moto => html`
                <div class="motorcycle">
                    <img src="${moto.imageUrl}" alt="example1" />
                    <h3 class="model">${moto.model}</h3>
                    <a class="details-btn" @click=${() => detailsView(moto)}>More Info</a>
                </div>
            `)}
        </div>
    `
    : html`
        <div class="search-result">
            <h2 class="no-available">No result.</h2>
        </div>
    `
}
    </section>`;

export function searchView()
{
    render(searchSection(), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    const item = data.search;

    if(!item)
    {
        render(searchSection([]), main);
        return;
    }

    const searchedItems = await motoService.searchMoto(item);
    console.log(searchedItems);
    render(searchSection(searchedItems), main);
}