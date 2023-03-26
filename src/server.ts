import App from '@/app';
import AssessmentsRoute from '@/routes/assessments.route';
import BandsRoute from '@routes/bands.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new AssessmentsRoute(), new BandsRoute(), new UsersRoute()]);

app.listen();
