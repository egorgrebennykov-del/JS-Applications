import { html, render } from '../libs/lit-html.js';
import { userService } from '../service/userService.js';
import { userHelp } from './userHelp.js';

const nav = document.querySelector('nav');

const navSection = (isAuth) => html`
    <a href="/browse-teams" class="action">Browse Teams</a>
    <a href="/login" class="${isAuth ? 'hidden' : 'action'}">Login</a>
    <a href="/register" class="${isAuth ? 'hidden' : 'action'}">Register</a>
    <a href="/my-teams" class="action">My Teams</a>
    <a href="/logout" class="${isAuth ? 'action' : 'hidden'}" @click=${userService.logout}>Logout</a>`;

export function navUpdate()
{
    render(navSection(userHelp.isAuthorized()), nav);
}