//import { page } from '../libs/page.js';
import { roating } from './utilities/roating.js';
import { navUpdate } from './utilities/navUpdate.js';

page((ctx, next) => {
    navUpdate();
    next();
});
//"start": "http-server -a localhost -p 3000 -P http://localhost:3000? -c-1"
roating();
navUpdate();
page('/home');