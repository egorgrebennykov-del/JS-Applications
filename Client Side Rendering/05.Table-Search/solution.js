import { html, render } from './lit-html.js';
import { getString } from './tableService.js';

const tbody = document.querySelector('tbody');

document.querySelector('#searchBtn').addEventListener('click', onClick);

async function onClick()
{
   const searchElement = document.getElementById('searchField').value;
   const cells = document.querySelectorAll('td');

   cells.forEach(cell => {
      cell.closest('tr').classList.remove('select');
   });

   cells.forEach(cell => {
      if(cell.textContent.toLowerCase().includes(searchElement.toLowerCase()))
      {
         cell.closest('tr').className = 'select';
      }
   });
}

async function loadTable()
{
   const strings = Object.values(await getString());
   const table = strings.map(string => 
                html`<tr id='${string._id}'>
                <td>${string.firstName} ${string.lastName}</td>
                <td>${string.email}</td>
                <td>${string.course}</td>
      </tr>`);

   render(table, tbody);
}

//{firstName: 'Mary', lastName: 'Sue', email: 'mary@gmail.com', course: 'JS-FUNDAMENTALS', _id: '28f0b99e-218b-4079-873c-f976727e3c44'}
loadTable();