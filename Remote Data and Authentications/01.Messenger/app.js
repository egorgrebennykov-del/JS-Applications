function attachEvents() {
    document.getElementById('submit').addEventListener('click', sendMessege);
    document.getElementById('refresh').addEventListener('click', showMesseges);

    async function sendMessege()
    {
        const author = document.getElementsByName('author')[0];
        const messege = document.getElementsByName('content')[0];

        const response = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({author: author.value, content: messege.value})
        });

        if(!response.ok)
        {
            alert('Error!');
        }

        author.value = '';
        messege.value = '';
    }

    async function showMesseges()
    {
        const response = await fetch('http://localhost:3030/jsonstore/messenger');
        const data = await response.json();

        const messenger = document.getElementById('messages');
        messenger.value = '';
        
        Object.values(data).forEach(messege => {
            messenger.value += `${messege.author}: ${messege.content}\n`;
        });
    }
}

attachEvents();