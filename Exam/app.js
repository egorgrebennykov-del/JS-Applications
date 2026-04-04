import { routing } from "./utility/routing.js";
import { navUpdate } from "./utility/navUpdate.js";

page((ctx, next) => {
    navUpdate();
    next();
});

routing();
navUpdate();
page('/home');