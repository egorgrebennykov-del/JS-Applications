import { html, render } from '../libs/lit-html.js';
import { mindfulsService } from '../services/mindfulsService.js';
import { detailsView } from './detailsView.js';

const main = document.querySelector('main');

const section = (mindfuls) => html`
  <h3 class="heading">Mindful Tips</h3>
  <section id="tips-dashboard">
    ${mindfuls && mindfuls.length > 0 ? 
      mindfuls.map(mindful => html`
        <div class="tip">
          <img src="${mindful.imageUrl}" alt="example1" />
          <h3 class="title">${mindful.title}</h3>
          <div class="tip-info">
            <p class="type">Type: ${mindful.type}</p>
            <p class="difficulty">Difficulty: ${mindful.difficulty}</p>
          </div>
          <a class="details-btn" @click=${() => detailsView(mindful._id)}>View Tip</a>
        </div>
      `)
    : html`<h3 class="empty">No Mindful Tips Added Yet.</h3>`}
  </section>
`;

export async function dashboardView()
{
    const mindfuls = await mindfulsService.getForDashboard();
    render(section(mindfuls), main);
}