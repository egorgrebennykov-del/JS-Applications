import { html, render } from '../libs/lit-html.js';
import { userHelp } from '../utility/userHelp.js';

const main = document.querySelector('main');

const homeSection = () => html`
    <section id="home">
                    <article class="hero layout">
                        <img src="./assets/team.png" class="left-col pad-med">
                        <div class="pad-med tm-hero-col">
                            <h2>Welcome to Team Manager!</h2>
                            <p class="${userHelp.isAuthorized() ? 'hidden' : ''}">Want to organize your peers? Create and manage a team for free.</p>
                            <p class="${userHelp.isAuthorized() ? '' : 'hidden'}">Looking for a team to join? Browse our communities and find like-minded people!</p>
                            <a href="/register" class="${userHelp.isAuthorized() ? 'hidden' : 'action cta '}">Sign Up Now</a>
                            <a href="/my-teams" class="${userHelp.isAuthorized() ? 'action cta' : 'hidden'}">Browse Teams</a>
                        </div>
                    </article>
                </section>`;

export function homeView()
{
    render(homeSection(), main);
}