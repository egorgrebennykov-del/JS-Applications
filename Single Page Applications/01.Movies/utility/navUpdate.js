import { html, render } from '../libs/lit-html.js';
import { userHelp } from './userHelp.js';

const nav = document.querySelector('.navbar-nav.ml-auto');;

const navBar = () => html`
        <li class="nav-item user">
          <a class='${userHelp.getUserData() ? 'nav-link' : 'hidden'}' id="welcome-msg">Welcome, ${userHelp.isAuthorized() ? userHelp.getUserData().email : ''}</a>
        </li>
        <li class="nav-item user ${userHelp.getUserData() ? '' : 'hidden'}">
          <a class="nav-link" href="/logout">Logout</a>
        </li>
        <li class="nav-item guest ${userHelp.getUserData() ? 'hidden' : ''}">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item guest ${userHelp.getUserData() ? 'hidden' : ''}">
          <a class="nav-link" href="/register">Register</a>
        </li>`;

export function navUpdate()
{
    render(navBar(), nav);
}