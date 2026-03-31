import { html, render } from '../libs/lit-html.js';
import { formService } from '../service/formService.js';
import { userService } from '../service/userService.js';

const main = document.querySelector('main');
let errorMess = '';

const loginSection = () => html`
        <section id="login">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Login</h1>
                </header>
                <form id="login-form" class="main-form pad-large" @submit=${onSubmit}>
                    <div class="${errorMess ? 'error' : 'hidden'}">${errorMess}</div>
                    <label>E-mail: <input type="text" name="email"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <input class="action cta" type="submit" value="Sign In">
                </form>
                <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                </footer>
            </article>
        </section>`;

export function loginView()
{
    render(loginSection(), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    errorMess = '';
    try {
        await userService.login(data);
    } catch (error) {
        errorMess = error.message;
        render(loginSection(), main);
    }
}

