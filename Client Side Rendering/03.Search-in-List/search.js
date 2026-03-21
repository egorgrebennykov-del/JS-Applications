import { html, render} from './lit-html.js';
import { towns } from './towns.js';

document.querySelector('button').addEventListener('click', search)

const townsList = document.getElementById('towns');
const result = document.getElementById('result');

function search() {
   let matchesCounter = 0;
   const searchedTown = document.getElementById('searchText').value;
   const towns = document.querySelectorAll('li');

   towns.forEach(town => {
      town.classList.remove('active');
      if(town.textContent.includes(searchedTown))
      {
         town.className = 'active';
         matchesCounter++;
      }
   });

   const resultStr = html`<p>${matchesCounter} matches found</p>`;
   render(resultStr, result);
}

async function makeList()
{
   const list = html`<ul>${towns.map(town => html`<li>${town}</li>`)}</ul>`;
   render(list, townsList);
}

makeList();