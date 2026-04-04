import { html, render } from '../libs/lit-html.js';
import { userHelp } from './userHelp.js';

const nav = document.querySelector('nav');

const navBar = () => html`
        <a href="/dashboard">Games</a>

        <!-- Logged-in users -->
        <div class='${userHelp.isAuthorized() ? 'user' : 'hidden'}'>
          <a href="/create">Add Game</a>
          <a id="logout" href="/logout">Logout</a>
        </div>

        <!-- Guest users -->
        <div class='${userHelp.isAuthorized() ? 'hidden' : 'guest'}'>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`;

export function navUpdate()
{
    render(navBar(), nav);
}