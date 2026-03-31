import { html, render } from '../libs/lit-html.js';
import { formService } from '../services/formService.js';
import { userService } from '../services/userService.js';

const main = document.querySelector('main');

const loginSection = () => html`
        <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onSubmit}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>`;

export function loginView()
{
    render(loginSection(), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    const {email, password} = data;

    if(!email || !password)
    {
        alert('Error');
        e.target.reset();
        return;
    }

    await userService.login({email, password});
}