import page from './lib/page.js';
import { navMiddleware } from './middleware/navMiddleware.js';
import homeView from './view/homeView.js';
import stopwatchView from './view/stopwatchView.js';
import tycoonGameView from './view/tycoonGameView.js';


page(navMiddleware);
page('/', homeView);
page('/stopwatch', stopwatchView);
page('/tycoon-game', tycoonGameView);
page.start();

