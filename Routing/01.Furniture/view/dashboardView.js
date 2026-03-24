import { html, render } from '../libs/lit-html.js';
import { furnitureService } from '../service/furnitureService.js';
import { detailsView } from './detailsView.js';

const container = document.querySelector('.container');

const dashboard = (allFurniture) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>
  <div class="row space-top">
    ${allFurniture.map(furniture => html`
      <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img src="${furniture.img}" />
            <p>${furniture.description}</p>
            <footer>
              <p>Price: <span>${furniture.price} $</span></p>
            </footer>
            <div>
              <button @click=${() => showDetails(furniture._id)} class="btn btn-info">Details</button>
            </div>
          </div>
        </div>
      </div>
    `)}
  </div>
`;

export async function dashboardView() {
  const allFurniture = (await furnitureService.getFurniture()).map(item => {
    if(item.img.startsWith('./'))
    {
      return {
          ...item,
          img: `01.Furniture/${item.img.slice(1)}`
      };
    }
    return item;
  }) || [];
  
  render(dashboard(allFurniture), container);
}

async function showDetails(id) {
  const furniture = await furnitureService.getFurniture(id);
  detailsView(furniture);
}