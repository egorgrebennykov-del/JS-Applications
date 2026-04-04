import { html, render } from '../libs/lit-html.js';
import { formService } from '../services/formService.js';
import { userService } from '../services/userService.js';

const main = document.querySelector('main');

const registerSection = () => html`
        <section id="form-sign-up" class="view-section">
      <form id="register-form" class="text-center border border-light p-5" @submit=${onSubmit}>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
        </div>

        <div class="form-group">
          <label for="repeatPassword">Repeat Password</label>
          <input id="repeatPassword" type="password" class="form-control" placeholder="Repeat-Password"
            name="repeatPassword" value="" />
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </section>`;

export function registerView()
{
    render(registerSection(), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    const {email, password, repeatPassword} = data;

    if(!email || !password || password !== repeatPassword || password.length < 6)
    {
        alert('Error');
        return;
    }

    await userService.register({email, password});
}