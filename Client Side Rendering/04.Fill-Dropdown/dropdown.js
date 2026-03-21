import { html, render } from './lit-html.js';
import { getItems } from './itemsService.js';
import { addItemToServer } from './itemsService.js';

const menu = document.getElementById('menu');
const form = document.querySelector('form');

form.addEventListener('submit', addItem);

async function addItem(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const addTown = formData.get('itemText');
    form.reset();

    if(!addTown)
    {
        return;
    }

    await addItemToServer(addTown);
    await createItemList();
}

async function createItemList()
{
    const items = await getItems();
    const itemList = html`${Object.values(items).map(item => html`<option value='${item._id}'>${item.text}</option>`)}`;
    render(itemList, menu);
}

createItemList();