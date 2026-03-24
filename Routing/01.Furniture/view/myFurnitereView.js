import { html, render } from '../libs/lit-html.js';
import { furnitureService } from '../service/furnitureService.js';
import { userHelp } from '../src/utilies/userHelp.js';
import { detailsView } from './detailsView.js';

const container = document.querySelector('.container');

const myFurnitureSection = (myFurniture) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
    ${myFurniture.map(furniture => html`
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                        <img src="${furniture.img}" />
                        <p>${furniture.description}</p>
                        <footer>
                            <p>Price: <span>${furniture.price} $</span></p>
                        </footer>
                        <div>
                            <a @click=${() => detailsView(furniture)} class="btn btn-info">Details</a>
                        </div>
                </div>
            </div>
        </div>`)}
    </div>`;

export async function myFurnitureView()
{
    const userData = userHelp.getUserData();
    const myFurniture = await furnitureService.getFurniture(`?where=_ownerId%3D%22${userData.id}%22`) || [];
    render(myFurnitureSection(myFurniture), container);
}