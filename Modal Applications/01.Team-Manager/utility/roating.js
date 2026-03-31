import { homeView } from '../views/homeView.js';
import { browseView } from '../views/browseView.js';
import { registerView } from '../views/registerView.js';
import { loginView } from '../views/loginView.js';
import { myTeamsView } from '../views/myTeamsView.js';
import { teamHomeView } from '../views/teamHomeView.js';
import { createView } from '../views/createView.js';
import { editView } from '../views/editView.js';
import { userService } from '../service/userService.js';

const page = window.page;

export function roating()
{
    page('/', homeView);
    page('/home', homeView);
    page('/browse-teams', browseView);
    page('/register', registerView);
    page('/login', loginView);
    page('/my-teams', myTeamsView);
    page('/team-home/:id', teamHomeView);
    page('/create', createView);
    page('/edit', editView);
    page('/logout', () => userService.logout());

    page.start();
}