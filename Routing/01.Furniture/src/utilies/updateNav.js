import { html, render } from '../../libs/lit-html.js';
import { userHelp } from '../utilies/userHelp.js';
import { userService } from '../../service/userService.js';

const navBar = document.querySelector('nav');

const navigation = () => html`
    <a id="catalogLink" href="/dashboard" >Dashboard</a>
                <div id="user" class=${userHelp.getUserData() ? '' : 'hidden'}>
                    <a id="createLink" href="/create">Create Furniture</a>
                    <a id="profileLink" href="/my-furniture" >My Publications</a>
                    <a id="logoutBtn" @click=${userService.logout}>Logout</a>
                </div>
                <div id="guest" class=${userHelp.getUserData() ? 'hidden' : ''}>
                    <a id="loginLink" href="/login">Login</a>
                    <a id="registerLink" href="/register">Register</a>
                </div>`;

export function updateNav()
{
    render(navigation(), navBar);
}
