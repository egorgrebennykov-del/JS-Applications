import { html, render } from '../libs/lit-html.js';
import { formService } from '../service/formService.js';
import { userService } from '../service/userService.js';

const main = document.querySelector('main');
let errorMess = '';

const registerSection = () => html`
            <section id="register">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form id="register-form" class="main-form pad-large" @submit=${onSubmit}>
                        <div class="${errorMess ? 'error' : 'hidden'}">${errorMess}</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input class="action cta" type="submit" value="Create Account">
                    </form>
                    <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
                    </footer>
                </article>
            </section>`;

export function registerView()
{
    render(registerSection(), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    errorMess = '';
    try {
        await userService.registration(data);
    } catch (error) {
        errorMess = error.message;
        render(registerSection(), main);
    }
}