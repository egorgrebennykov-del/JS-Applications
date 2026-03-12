const BASE_URL = 'http://localhost:3030/jsonstore/collections/books/';
document.getElementById('loadBooks').addEventListener('click', loadBooks);

const form = document.querySelector('form');
form.addEventListener('submit', createBook);

let idToEdit = null;

async function loadBooks()
{
    const response = await fetch(BASE_URL);
    const data = await response.json();

    const table = document.querySelector('tbody');
    table.innerHTML = '';

    Object.entries(data).forEach(bookData => {
        const newStr = document.createElement('tr');
        newStr.id = bookData[0];

        const title = document.createElement('td');
        title.textContent = bookData[1].title;

        const author = document.createElement('td');
        author.textContent = bookData[1].author;

        newStr.appendChild(title);
        newStr.appendChild(author);

        const buttonsCell = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.addEventListener('click', editBook);
        editBtn.textContent = 'Edit';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', deleteBook);
        deleteBtn.textContent = 'Delete';

        buttonsCell.appendChild(editBtn);
        buttonsCell.appendChild(deleteBtn);

        newStr.appendChild(buttonsCell);
        table.appendChild(newStr);
    });
}

loadBooks();

function editBook(e)
{
    const book = e.target.closest('tr');
    idToEdit = book.id;

    form.querySelector('h3').textContent = 'Edit FORM';
    form.querySelector('button').textContent = 'Save';

    form.querySelector("input[name='title']").value = 
        book.querySelectorAll('td')[0].textContent;

    form.querySelector("input[name='author']").value = 
        book.querySelectorAll('td')[1].textContent;

}

async function createBook(e)
{
    e.preventDefault();
    const data = new FormData(form);

    const newBook = {
        'title': data.get('title'),
        'author': data.get('author')
    };

    if(idToEdit === null)
    {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });
    }
    else
    {
        const response = await fetch(BASE_URL + idToEdit, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        form.querySelector('h3').textContent = 'FORM';
        form.querySelector('button').textContent = 'Submit';
        idToEdit = null;
    }

    form.reset();
    loadBooks();
}

async function deleteBook(e)
{
    const deleteId = e.target.closest('tr').id;

    const response = await fetch(BASE_URL + deleteId, {
        method: 'DELETE',
    });

    loadBooks();
}


