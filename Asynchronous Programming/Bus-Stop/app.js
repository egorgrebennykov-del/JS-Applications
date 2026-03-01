async function getInfo() {
    const BASE_URL = "http://localhost:3030/jsonstore/bus/businfo/";
    const stopID = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const busesList = document.getElementById('buses');

    function clear(reason) {
        stopName.textContent = reason;
        busesList.innerHTML = '';
    }

    clear('');

    try {
        const response = await fetch(BASE_URL + stopID);

        const data = await response.json();

        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesList.appendChild(li);
        });

    } catch (err) {
        clear('Error');
    }
}