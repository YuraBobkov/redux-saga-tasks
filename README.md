# redux-saga-tasks

> Storage of meta information for your tasks in redux-saga

**Note:** your project should use [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)

## Install

```sh
yarn add redux-saga@^1.0.5 redux-saga-tasks
```

## Usage

### Setup root reducer

```js
import { combineReducers } from 'redux';
import { reducer as tasks } from 'redux-saga-tasks';

const rootReducer = combineReducers({
  tasks,
});
```

You need to wrap your saga in `createTaskSaga`:

```js
import { call, put } from 'redux-saga/effects';
import { createTaskSaga } from 'redux-saga-tasks';

function* findItems() {
  const data = yield call(api.find);

  yield put(findItemsSuccess(data));

  return {
    ids: data.map(item => item.id),
  };
}

function* watchFindItems() {
  yield takeEvery('FIND_ITEMS', createTaskSaga(findItems));
}
```

And use action creator:

```js
import { createTaskAction } from 'redux-saga-tasks';

export const findItems = createTaskAction('FIND_ITEMS');
```

### Example of use in component:

```js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  getIsRunning,
  getIsFinished,
  getData,
  getError,
} from 'redux-saga-tasks';

import { findItems } from '../items/selectors';
import Item from './Item';

const List = () => {
  const [taskId, setTaskId] = useState(null);
  const dispatch = useDispatch();

  const data = useSelector(
    state => ({
      ids: getData(state, taskId),
      isRunning: getIsRunning(state, taskId),
      isFinished: getIsFinished(state, taskId),
      error: getError(state, taskId),
    }),
    shallowEqual,
  );

  useEffect(() => {
    const { meta } = dispatch(findItems());

    setTaskId(meta.taskId);
  }, []);

  if (data.isRunning) {
    return 'running';
  }

  if (error) {
    return 'error';
  }

  return data.isFinished ? (
    <ul>
      {data.ids.map(id => (
        <li>{id}</li>
      ))}
    </ul>
  ) : null;
};
```

### Custom parseError

By default, error gets name, message, and stack from the error object. This behavior can be changed:

```js
function* watchFindItems() {
  yield takeEvery(
    'FIND_ITEMS',
    createTaskSaga(findItems, {
      parseError: err => err.response.data,
    }),
  );
}
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
