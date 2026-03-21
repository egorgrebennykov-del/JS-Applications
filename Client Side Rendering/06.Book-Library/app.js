import { html, render } from './lit-html.js';
import { getStrings } from './tableService.js';
import { addBookInServer } from './tableService.js';
import { editBookInServer } from './tableService.js';
import { getOneBook } from'./tableService.js';
import { deleteBookFromServer } from './tableService.js';

const editForm = document.getElementById('edit-form');
const addForm = document.getElementById('add-form');
const tbody = document.querySelector('tbody');

document.getElementById('loadBooks').addEventListener('click', showTable);
window.addEventListener('load', () => {
    editForm.style.display = 'none';
    addForm.style.display = 'block';
    showTable();
});

addForm.addEventListener('submit', addBook);
editForm.addEventListener('submit', editBook);

//{author: 'Svetlin Nakov', title: 'C# Fundamentals'}
async function showTable()
{
    const strings = Object.values(await getStrings());
    const table = strings.map(string => html`
            <tr id=${string._id}>
                <td>${string.title}</td>
                <td>${string.author}</td>
                <td>
                    <button @click=${openEditForm}>Edit</button>
                    <button @click=${deleteBook}>Delete</button>
                </td>
            </tr>`);

    render(table, tbody);
}

async function addBook(e)
{
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    await addBookInServer(formData);
    addForm.reset();
    showTable();
}

let idToEdit;

async function openEditForm(e)
{
    editForm.style.display = 'block';
    addForm.style.display = 'none';
    const id = e.target.closest('tr').id;
    const bookData = await getOneBook(id);
    editForm.title.value = bookData.title;
    editForm.author.value = bookData.author;
    idToEdit = bookData._id;
}

async function editBook(e)
{
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    await editBookInServer(formData, idToEdit);
    editForm.reset();
    editForm.style.display = 'none';
    addForm.style.display = 'block';
    showTable();
}

async function deleteBook(e)
{
    const id = e.target.closest('tr').id;
    await deleteBookFromServer(id);
    showTable();
}
