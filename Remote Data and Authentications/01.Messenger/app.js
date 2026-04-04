function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/messenger';

    const textAreaRef = document.getElementById('messages');
    const nameRef = document.querySelector('input[name="author"]');
    const msgRef = document.querySelector('input[name="content"]');

    onLoad();


    document.getElementById('submit').addEventListener('click', onSubmit);
    document.getElementById('refresh').addEventListener('click', onLoad);

    async function onLoad() {
        try {
            const response = await fetch(BASE_URL);
            const data = await response.json();

            const result = Object.values(data)
                .map(msg => `${msg.author}: ${msg.content}`)
                .join('\n');

            textAreaRef.value = result;
        } catch (error) {
            textAreaRef.value = 'No Messages';
        }
    }

    async function onSubmit(e)
    {
        const name = nameRef.value;
        const msg = msgRef.value;

        nameRef.value = '';
        msgRef.value = '';

        if(!name || !msg)
        {
            return;
        }

        const data = {
            author: name,
            content: msg
        };

        await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        onLoad();
    }
}

attachEvents();