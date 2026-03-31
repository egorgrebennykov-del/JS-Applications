import { html, render } from '../libs/lit-html.js';
import { motoService } from '../services/motoService.js';
import { detailsView } from './detailsView.js';

const main = document.querySelector('main');

const dashboardSection = (allMoto) => html`
 <h2>Available Motorcycles</h2>
    <section id="dashboard">
        ${allMoto && allMoto.length > 0
            ? allMoto.map(moto => html`
                <div class="motorcycle">
                    <img src="${moto.imageUrl}" alt="example1" />
                    <h3 class="model">${moto.model}</h3>
                    <p class="year">Year: ${moto.year}</p>
                    <p class="mileage">Mileage: ${moto.mileage} km.</p>
                    <p class="contact">Contact Number: ${moto.contact}</p>
                    <a class="details-btn" @click=${() => detailsView(moto._id)}>More Info</a>
                </div>
            `)
            : html`<h2 class="no-available">No avaliable motorcycles yet.</h2>`
        }
    </section>
`;

export async function dashboardView()
{
    const allMoto = await motoService.getAllMoto();
    // Для отладки: сохраняем в window, чтобы можно было получить из теста
    // window.allMoto = allMoto;
    // console.log('allMoto:', allMoto);
    render(dashboardSection(allMoto), main);
}