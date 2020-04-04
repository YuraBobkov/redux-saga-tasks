import { createAction, getId } from './utils';

const createTaskAction = (type) =>
  createAction(type, () => ({ taskId: getId() }));

export default createTaskAction;
