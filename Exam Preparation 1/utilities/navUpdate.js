import { html, render } from '../libs/lit-html.js';
import { userHelp } from './userHelp.js';
import { userService } from '../services/userService.js';

const nav = document.querySelector('nav');

const navBar = () => html`
        <div>
            <a href="/motorcycles">Motorcycles</a>
            <a href="/search">Search</a>
          </div>

          <!-- Logged-in users -->
          ${userHelp.isAuthorized() ? html`
            <div class="user">
                <a href="/create">Add Motorcycle</a>
                <a @click=${userService.logout}>Logout</a>
            </div>` : null}

            ${!userHelp.isAuthorized() ? html`
            <div class="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>` : null}`;

export function navUpdate()
{
    render(navBar(), nav);
}