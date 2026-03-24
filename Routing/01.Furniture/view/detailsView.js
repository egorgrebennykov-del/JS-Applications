import { html, render } from '../libs/lit-html.js';
import { furnitureService } from '../service/furnitureService.js';
import { editView } from './editView.js';
import { userHelp } from '../src/utilies/userHelp.js';
import page from '../libs/page.mjs';

const container = document.querySelector('.container');
let currentFurniture;

const details = (furniture) => html`
   <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${furniture.img}" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${furniture.make}</span></p>
            <p>Model: <span>${furniture.model}</span></p>
            <p>Year: <span>${furniture.year}</span></p>
            <p>Description: <span>${furniture.description}</span></p>
            <p>Price: <span>${furniture.price}</span></p>
            <p>Material: <span>${furniture.material}</span></p>
            <div>
                <a @click=${() => editView(furniture)} class="btn btn-info ${userHelp.isAuthorized() ? '' : 'hidden'}" >Edit</a>
                <a @click=${onDelete} class="btn btn-info ${userHelp.isAuthorized() ? '' : 'hidden'}">Delete</a>
            </div>
        </div>
    </div>`;

export async function detailsView(furniture)
{
    currentFurniture = furniture;
    history.pushState({}, '', '/details');
    render(details(furniture), container);
}

async function onDelete(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
        await furnitureService.deleteFurniture(currentFurniture._id);
        page.redirect('/dashboard');
    }
}