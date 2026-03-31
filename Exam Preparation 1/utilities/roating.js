//import { page } from '../libs/page.js';
import { homeView } from '../views/homeView.js';
import { createView } from '../views/createView.js';
import { dashboardView } from '../views/dashboardView.js';
import { detailsView } from '../views/detailsView.js';
import { editView } from '../views/editView.js';
import { loginView } from '../views/loginView.js';
import { registerView } from '../views/registerView.js';
import { searchView } from '../views/searchView.js';


export function roating()
{
    page('/', homeView);    
    page('/home', homeView); // TODO: remove after tests
    page('/create', createView);
    page('/motorcycles', dashboardView);
    page('/details', detailsView);
    page('/edit', editView);
    page('/login', loginView);
    page('/register', registerView);
    page('/search', searchView);

    page.start();
}