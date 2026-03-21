import { html, render} from './lit-html.js';
import { cats } from './catSeeder.js';

const allCats = document.getElementById('allCats');

async function showAllCats()
{
    const catsList = html`
    <ul>
        ${cats.map(cat => html`<li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${showStatusCode}>Show status code</button>
                    <div class="status" style="display: none" id="${cat.id}">
                        <h4 class="card-title">Status Code: ${cat.statusCode}</h4>
                        <p class="card-text">${cat.statusMessage}</p>
                    </div>
                </div>
            </li>`)}
    </ul>`;

    render(catsList, allCats);
}

async function showStatusCode(e)
{
    const infoDiv = e.target.closest('.info');
    const statusDiv = infoDiv.querySelector('.status');

    if (e.target.textContent === 'Show status code') {
        e.target.textContent = 'Hide status code';
        statusDiv.style.display = 'block';
    } else {
        e.target.textContent = 'Show status code';
        statusDiv.style.display = 'none';
    }   
}

showAllCats();