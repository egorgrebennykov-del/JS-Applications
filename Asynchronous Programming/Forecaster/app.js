const BASE_URL = 'http://localhost:3030/jsonstore/forecaster/';
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', attachEvents);

async function request(url)
{
    const response = await fetch(url);
    const data = Object.fromEntries(await response.json());
    return data;
}

async function attachEvents() {
    const location = document.getElementById('location');

    const locationCode = await request(BASE_URL).some(obj => obj.name === location).code;

    if(locationCode)
    {
        const curerentWeather = await request(BASE_URL + `/${locationCode}`);
        const weatherForThreeDays = await request(BASE_URL + `/upcoming/${locationCode}`);

        

    }
}