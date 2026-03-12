function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadNumbers);
    document.getElementById('btnCreate').addEventListener('click', createNumber);

    const BASE_URL = 'http://localhost:3030/jsonstore/phonebook/';

    async function deleteNumber(e)
    {
        const numberToDelete = e.target.parentElement;
        const response = await fetch(BASE_URL + numberToDelete.id, {
            method: 'DELETE'
        });

        numberToDelete.remove();
    }

    async function loadNumbers()
    {
        const response = await fetch(BASE_URL);
        const data = await response.json();


        const numbersList = document.getElementById('phonebook');
        numbersList.innerHTML = '';

        Object.values(data).forEach(numberInfo => {
            const li = document.createElement('li');
            li.id = numberInfo._id;
            li.textContent = `${numberInfo.person}: ${numberInfo.phone}`;

            const btn = document.createElement('button');
            btn.textContent = 'Delete';
            btn.addEventListener('click', deleteNumber);

            li.appendChild(btn);
            numbersList.appendChild(li);
        });
    }

    async function createNumber()
    {
        const person = document.getElementById('person');
        const phone = document.getElementById('phone');

        if(!person.value || !phone.value)
        {
            alert('Invalid Data');
            return;
        }

        const response = await fetch(BASE_URL, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({person: person.value, phone: phone.value})
        });

        person.value = '';
        phone.value = '';

        await loadNumbers();
    }
}

attachEvents();