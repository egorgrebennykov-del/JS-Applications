function solve() {

    const BASE_URL = 'http://localhost:3030/jsonstore/bus/schedule/';
    const info = document.getElementById('info');
    const arriveBtn = document.getElementById('arrive');

    let stopInfo = {
        name: '',
        next: 'depot'
    };

    async function depart() {
        arriveBtn.disabled = false;
        document.getElementById('depart').disabled = true;

        const response = await fetch(BASE_URL + stopInfo.next);
        const data = await response.json();
        stopInfo.name = data.name;
        stopInfo.next = data.next;
        info.textContent = `Next stop ${data.name}`;
    }

    async function arrive() {
        arriveBtn.disabled = true;
        info.textContent = `Arriving at ${stopInfo.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();