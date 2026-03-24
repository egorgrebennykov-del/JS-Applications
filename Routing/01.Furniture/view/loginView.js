import { html, render } from '../libs/lit-html.js';
import { userService } from '../service/userService.js';
import page from '../libs/page.mjs';

const container = document.querySelector('.container');

const loginTemplate = () => html`
            <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
     <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>`;

async function onSubmit(e)
{
    e.preventDefault();
    const formData = new FormData(e.target);
    const {email, password} = Object.fromEntries(formData);

    if(!email || !password)
    {
        return alert('Error!');
    }

    await userService.login({email, password});
    e.target.reset();
    page.redirect('/dashboard');
}

export function loginView()
{
    render(loginTemplate(), container);
}