import { html, render } from '../libs/lit-html.js';
import { formService } from '../services/formService.js';
import { userService } from '../services/userService.js';

const main = document.querySelector('main');

const registerSection = () => html`
      <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="register-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>`;

export function registerView()
{
    render(registerSection(), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    const {email, password} = data;
    const repeatPassword = data['re-password'];

    if(!email || !password || password !== repeatPassword)
    {
        alert('Error');
        e.target.reset();
        return;
    }

    await userService.register({email, password});
}