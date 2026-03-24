import page from './libs/page.mjs';
import { updateNav } from './src/utilies/updateNav.js';
import { dashboardView } from './view/dashboardView.js';
import { createView } from './view/createView.js';
import { loginView } from './view/loginView.js';
import { editView } from './view/editView.js';
import { registerView } from './view/registerView.js';
import { detailsView } from './view/detailsView.js';
import { myFurnitureView } from './view/myFurnitereView.js';

page((ctx, next) => {
    updateNav();
    next();
});

page('/', dashboardView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);
page('/edit', editView);
page('/my-furniture', myFurnitureView);
page('/details', detailsView);

page.redirect('/dashboard');

page.start();