import { isAuthorised } from '../src/auth.js';
import { registerUserInServer } from './auth.js';
import { loginInServer } from './auth.js';
import { logoutFromServer } from './auth.js';
import { getIdeasFromServer } from './services/detailsService.js';
import { getOneIdeaFromServer } from './services/detailsService.js';
import { deleteIdeaFromServer } from './services/detailsService.js';
import { createIdeaOnServer } from './services/detailsService.js';

const guestElements = document.querySelectorAll('.guest');
const userElements = document.querySelectorAll('.authorised');

function closeSections()
{
    const sectionsId = ['home', 'login', 'register', 'dashboard-holder', 'details', 'create'];

    sectionsId.forEach(sectionId => {
        document.getElementById(sectionId).style.display = 'none';
    });
    guestElements.forEach(element => element.style.display = isAuthorised() ? 'none' : 'block');
    userElements.forEach(element => element.style.display = isAuthorised() ? 'block' : 'none');
}

closeSections();

window.addEventListener('hashchange', changeSection);

function openSection(sectionId)
{
    closeSections();
    const section = document.getElementById(sectionId);
    section.style.display = 'block';
    window.location.hash = `#/${sectionId}`;

    if(sectionId === 'dashboard-holder')
    {
        openDashboard();
    }
}

function changeSection()
{
    const hash = window.location.hash.slice(2);
    if(hash === 'create' && isAuthorised())
    {
        openSection('create');
    } else if(['login', 'register'].includes(hash) && !isAuthorised())
    {
        openSection(hash);
    } else if(['home', 'dashboard-holder', 'details'].includes(hash))
    {
        openSection(hash);
    } else if(hash === 'logout')
    {
        logoutFromServer();
        openSection('home');
    } else {
        alert('Error!');
        openSection('home');
    }
}

async function openDashboard()
{
    const dashboard = document.getElementById('dashboard-holder');
    const ideas = await getIdeasFromServer();

    dashboard.innerHTML = '';

    if(ideas !== null)
    {
        ideas.forEach(idea => {
            const ideaHTML = document.createElement('div');
            ideaHTML.className = 'card overflow-hidden current-card details';
            ideaHTML.style = 'width: 20rem; height: 18rem;';
            ideaHTML.id = idea._id;
            ideaHTML.innerHTML = `
            <div class="card-body">
                <p class="card-text">${idea.title}</p>
            </div>
            <img class="card-image" src="${idea.img}" alt="Card image cap">
            <button class="btn">Details</button>`;

            ideaHTML.querySelector('button').addEventListener('click', () => openDetails(idea._id));
            dashboard.appendChild(ideaHTML);
        });
    }
    else
    {
        const noIdeas = document.createElement('h1');
        noIdeas.textContent = 'No ideas yet! Be the first one :)';
        noIdeas.classList.add('no-ideas'); 
        dashboard.appendChild(noIdeas);
    }
}

async function openDetails(ideaId)
{
    openSection('details');
    try{
        const details = document.getElementById('details');
        const idea = await getOneIdeaFromServer(ideaId);

        details.innerHTML = '';

        details.innerHTML = `
                <img class="det-img" src="${idea.img}" />
        <div class="desc">
            <h2 class="display-5">${idea.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${idea.description}</p>
        </div>
        <div class="text-center"></div>`

        if(isAuthorised())
        {
            const btnDiv = details.querySelector('.text-center');
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn detb';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteIdea(idea._id));
            btnDiv.appendChild(deleteBtn);
        }
    }
    catch(error){
        alert('Error!');
        openSection('home');
    }
}

async function deleteIdea(id)
{
    try{
        await deleteIdeaFromServer(id);
    }
    catch(error)
    {
        alert('Error!');
    }

    openSection('dashboard-holder');
}

window.addEventListener('load', () => {
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', registerUser);

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', loginUser);

    const createForm = document.getElementById('createForm');
    createForm.addEventListener('submit', createIdea);

    async function createIdea(e)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try{
            await createIdeaOnServer(data);
            openSection('dashboard-holder');
        }
        catch (error){
            alert('Error!');
        }

        e.target.reset();
    }

    async function registerUser(e)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try{
            await registerUserInServer(data);
            openSection('home');
        }
        catch(error)
        {
            alert('Error!');
        }
        e.target.reset();
    }

    async function loginUser(e)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try{
            await loginInServer(data);
            openSection('home');
        }
        catch(error)
        {
            alert('Error');
        }
        e.target.reset();
    }

    if(!window.location.hash)
    {
        openSection('home');
    }
    else
    {
        openSection(window.location.hash.slice(2));
    }
});