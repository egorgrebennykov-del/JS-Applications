import { navUpdate } from './utility/navUpdate.js';
import { roating } from './utility/roating.js';

const page = window.page;

page((ctx, next) => {
    navUpdate();
    next();
});

roating();
page('/home');