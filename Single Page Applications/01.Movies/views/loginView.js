import { html, render } from '../libs/lit-html.js';
import { userService } from '../services/userService.js';
import { formService } from '../services/formService.js';

const main = document.querySelector('main');

const section = () => html`
      <section id="form-login" class="view-section">
      <form id="login-form" class="text-center border border-light p-5" @submit=${onSubmit}>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </section>`;

export function loginView()
{
    render(section(), main);
}

async function onSubmit(e)
{
    const data = formService(e);
    const {email, password} = data;

    if(!email || !password)
    {
        alert('Error');
        return;
    }

    await userService.login({ email, password });
}