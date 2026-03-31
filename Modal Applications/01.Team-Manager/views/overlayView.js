import { html, render } from '../libs/lit-html.js';

const body = document.querySelector('body')

const overlaySection = () => html`
    <div class="overlay">
        <div class="modal">
            <p>Overlay message</p>
            <a href="/home" class="action">Action</a>
        </div>
    </div>`;

export function overlayView()
{
    render(overlaySection(), body);
}