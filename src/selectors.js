const getTask = (state, id) => state.tasks[id];

const createGetProp = (key) => (state, id) => {
  const task = getTask(state, id);

  return task ? task[key] : null;
};

const createGetBoolProp = (key) => {
  const getProp = createGetProp(key);

  return (state, id) => getProp(state, id) || false;
};

export const getIsFinished = createGetBoolProp('finished');

export const getIsRunning = (state, id) =>
  getTask(state, id) ? !getIsFinished(state, id) : false;

export const getData = createGetProp('data');

export const getError = createGetProp('error');
