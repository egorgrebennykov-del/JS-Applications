window.addEventListener('load', loadTab)

const BASE_URL = 'http://localhost:3030/jsonstore/collections/students';

const form = document.getElementById('form');
form.addEventListener('submit', addStudent);

async function loadTab()
{
    const tableData = document.querySelector('tbody');
    tableData.innerHTML = '';

    const responce = await fetch(BASE_URL);
    const data = await responce.json();

    Object.values(data).forEach(student => {
        const newStr = document.createElement('tr');

        Object.entries(student).forEach(([key, value]) => {
            if(key !== '_id')
            {
                const newCell = document.createElement('td');
                newCell.textContent = value;
                newStr.appendChild(newCell);
            }
        });

        tableData.appendChild(newStr);
    });
}

async function addStudent(e)
{
    e.preventDefault();

    const data = new FormData(e.target);
    const student = {
        'firstName': data.get('firstName'),
        'lastName' : data.get('lastName'), 
        'facultyNumber' : data.get('facultyNumber'), 
        'grade': data.get('grade').toString()
    };

    if(Array.from(Object.values(student)).includes(''))
    {
        alert('Incorrect Input');
        return;
    }

    const responce = await fetch(BASE_URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(student)
    });

    form.reset();
    loadTab();
}