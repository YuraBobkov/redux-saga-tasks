import 'regenerator-runtime';

import { put, call } from 'redux-saga/effects';
import { start, success, failure } from '../actions';

import createTaskSaga from '../createTaskSaga';

const data = 'data';

function* saga() {
  yield data;
}

describe('creating task saga', () => {
  const taskSaga = createTaskSaga(saga);

  it('should put start and success actions', () => {
    const id = 42;
    const action = { meta: { taskId: id } };
    const iterator = taskSaga(action);

    expect(iterator.next().value).toEqual(put(start({ id })));
    expect(iterator.next().value).toEqual(call(saga, action));
    expect(iterator.next(data).value).toEqual(put(success({ id, data })));
    expect(iterator.next().value).toBe(null);
    expect(iterator.next().done).toBe(true);
  });

  it('should put start and error actions', () => {
    const id = 42;
    const action = { meta: { taskId: id } };
    const iterator = taskSaga(action);
    const error = new Error('Error message');

    expect(iterator.next().value).toEqual(put(start({ id })));
    expect(iterator.next().value).toEqual(call(saga, action));
    expect(iterator.throw(error).value).toEqual(
      put(
        failure({
          id,
          error: {
            message: error.message,
            name: error.name,
            stack: error.stack,
          },
        }),
      ),
    );
    expect(iterator.next().value).toBe(null);
    expect(iterator.next().done).toBe(true);
  });

  it('should put start and error actions with nullable error value', () => {
    const id = 42;
    const action = { meta: { taskId: id } };
    const iterator = taskSaga(action);
    const error = null;

    expect(iterator.next().value).toEqual(put(start({ id })));
    expect(iterator.next().value).toEqual(call(saga, action));
    expect(iterator.throw(error).value).toEqual(
      put(failure({ id, error: null })),
    );
    expect(iterator.next().value).toBe(null);
    expect(iterator.next().done).toBe(true);
  });

  it('should check custom parseError', () => {
    const taskSagaWithCustomError = createTaskSaga(saga, {
      parseError: (err) => err.name,
    });

    const id = 42;
    const action = { meta: { taskId: id } };
    const iterator = taskSagaWithCustomError(action);
    const error = new Error('Error message');

    expect(iterator.next().value).toEqual(put(start({ id })));
    expect(iterator.next().value).toEqual(call(saga, action));
    expect(iterator.throw(error).value).toEqual(
      put(failure({ id, error: error.name })),
    );
    expect(iterator.next().value).toBe(null);
    expect(iterator.next().done).toBe(true);
  });
});
