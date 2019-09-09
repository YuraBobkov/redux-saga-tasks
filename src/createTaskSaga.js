import { put } from 'redux-saga/effects';

import { failure, start, success } from './actions';
import { pick } from './utils';

const createTaskSaga = saga =>
  function* taskSaga(action) {
    const { taskId } = action.meta;

    yield put(start({ id: taskId }));

    try {
      const data = yield* saga(action);

      yield put(success({ id: taskId, data }));
    } catch (error) {
      yield put(
        failure({
          id: taskId,
          error: pick(['name', 'message', 'stack'], error),
        }),
      );
    }

    return null;
  };

export default createTaskSaga;
