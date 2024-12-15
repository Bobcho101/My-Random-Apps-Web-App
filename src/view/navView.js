import { html, renderInHeader } from "../lib/lit-html.js";

const template = () => html`
 <div class="navbar">
        <a href="/">Home</a>
        <a href="/tycoon-game">Tycoon Game</a>
        <a href="/stopwatch">Stopwatch</a>
    </div>
`;

export default async function navView(ctx) {
    renderInHeader(template());
}