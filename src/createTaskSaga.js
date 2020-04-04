import { put, call } from 'redux-saga/effects';

import { failure, start, success } from './actions';
import { pick } from './utils';

const defaultParseError = (err) =>
  err ? pick(['name', 'message', 'stack'], err) : null;

const createTaskSaga = (saga, options = {}) =>
  function* taskSaga(action) {
    const { parseError = defaultParseError } = options;
    const { taskId } = action.meta;

    yield put(start({ id: taskId }));

    try {
      const data = yield call(saga, action);

      yield put(success({ id: taskId, data }));
    } catch (err) {
      yield put(
        failure({
          id: taskId,
          error: parseError(err),
        }),
      );
    }

    return null;
  };

export default createTaskSaga;
