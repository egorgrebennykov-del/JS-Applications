import { html, render } from '../libs/lit-html.js';
import { userService } from '../service/userService.js';
import page from '../libs/page.mjs';

const container = document.querySelector('.container');

const registration = () => html`
        <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
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
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class="form-control" id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>`;

export function registerView()
{
    render(registration(), container);
}

export async function onSubmit(e)
{
    e.preventDefault()
    const formData = new FormData(e.target);
    const {email, password, rePass} = Object.fromEntries(formData);

    if(!email || !password || !rePass || password !== rePass)
    {
        return alert('Error!');
    }

    await userService.register({email, password});
    e.target.reset();
    page.redirect('/dashboard');
}