import navView from "../view/navView.js";

export function navMiddleware(ctx, next){
    navView();
    next();
}