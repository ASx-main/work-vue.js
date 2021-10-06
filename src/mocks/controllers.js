// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import handlers from './handlers';

export default [
  rest.post('/registration', handlers.registration),
];
