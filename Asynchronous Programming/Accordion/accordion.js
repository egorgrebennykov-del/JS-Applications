window.addEventListener('DOMContentLoaded', solution);

async function solution() {
    const BASE_URL = 'http://localhost:3030/jsonstore/advanced/articles/';

    const response = await fetch(BASE_URL + 'list');
    const data = await response.json();

    function showMore(e)
    {
        const btn = e.target;
        const accordion = btn.closest('.accordion');
        const extra = accordion.querySelector('.extra');
        extra.style.display = extra.style.display === 'block' ? 'none' : 'block';
        btn.textContent = btn.textContent === 'More' ? 'Hide' : 'More';
    }

    for(let [num, info] of Object.entries(data))
    {
        const publicationInfo = await fetch(BASE_URL + 'details/' + info._id);
        const publicationInfoJSON = await publicationInfo.json();

        const mainSection = document.getElementById('main');
        const newPublication = document.createElement('div');
        newPublication.className = 'accordion';

        newPublication.innerHTML = `
        <div class="head">
            <span>${publicationInfoJSON.title}</span>
            <button class="button" id="${publicationInfoJSON._id}">More</button>
        </div>
        <div class="extra" style="display: none;">
            <p>${publicationInfoJSON.content}</p>
        </div>
    `;

        const moreBtn = newPublication.querySelector('button');
        moreBtn.addEventListener('click', showMore);
        mainSection.appendChild(newPublication);
    }
}