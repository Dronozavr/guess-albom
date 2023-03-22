import App from '@/app';
import IndexRoute from '@routes/index.route';
import BandsRoute from '@routes/bands.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new BandsRoute()]);

app.listen();
