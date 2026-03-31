import { createView } from "../views/createView.js";
import { dashboardView } from "../views/dashboardView.js";
import { detailsView } from "../views/detailsView.js";
import { editView } from "../views/editView.js";
import { homeView } from "../views/homeView.js";
import { loginView } from "../views/loginView.js";
import { registerView } from "../views/registerView.js";
import { userService } from "../services/userService.js";


export function routing()
{
    page('/', homeView);
    page('/home', homeView);
    page('/share-tip', createView);
    page('/mindful-tipes', dashboardView);
    page('/details', detailsView);
    page('/edit', editView);
    page('/login', loginView);
    page('/register', registerView);
    page('/logout', userService.logout);

    page.start();
}