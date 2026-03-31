import { html, render } from '../libs/lit-html.js';

const main = document.querySelector('main');

const homeSection = () => html`
        <section id="home">
          <h1>Unleash the spirit of speed with <span>Samurider</span> - where samurai soul meets Japanese engineering.</h1>

          <img
            src="./images/logo.webp"
            alt="home"
          />

        </section>`;

export function homeView()
{
    render(homeSection(), main);
}