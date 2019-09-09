import { FAILURE, START, SUCCESS } from './types';
import { createAction } from './utils';

export const start = createAction(START);

export const success = createAction(SUCCESS);

export const failure = createAction(FAILURE);
