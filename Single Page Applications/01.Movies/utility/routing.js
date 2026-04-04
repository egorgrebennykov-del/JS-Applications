import { homeView } from '../views/homeView.js';
import { createView } from '../views/createView.js';
import { editView } from '../views/editView.js';
import { loginView } from '../views/loginView.js';
import { registerView } from '../views/registerView.js';
import { userService } from '../services/userService.js'


export function routing()
{
    page('/', homeView);
    page('/home', homeView);
    page('/create', createView);
    page('/edit', editView);
    page('/login', loginView);
    page('/register', registerView);
    page('/logout', userService.logout);

    page.start();
}