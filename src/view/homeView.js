import { html, renderInMain } from "../lib/lit-html.js";

const template = () => html`
    <h1 id="title">Random Apps</h1>
`;

export default async function homeView(ctx){
    renderInMain(template());
}