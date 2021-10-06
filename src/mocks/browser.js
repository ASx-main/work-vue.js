// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw';
import controllers from './controllers';

export default setupWorker(...controllers);
