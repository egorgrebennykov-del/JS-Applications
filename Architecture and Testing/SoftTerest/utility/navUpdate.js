import { html, render } from '../libs/lit-html.js';
import { userHelp } from './userHelp.js';

const nav = document.querySelector('.navbar-nav.ml-auto');;

const navBar = () => html`
        <li class="nav-item user">
          <a class="nav-link" id="welcome-msg">Welcome, ${userHelp.getUserData() ? userHelp.getUserData().email : 'guest'}</a>
        </li>
        <li class="nav-item user" class='${userHelp.getUserData() ? '' : 'hidden'}'>
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