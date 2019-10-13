import createTaskAction from '../createTaskAction';

describe('creating task action', () => {
  const action = createTaskAction('TYPE');

  it('should create action without payload', () => {
    expect(action()).toEqual({ type: 'TYPE', meta: { taskId: 1 } });
  });

  it('should create action with payload', () => {
    expect(action(null)).toEqual({
      type: 'TYPE',
      payload: null,
      meta: { taskId: 2 },
    });
    expect(action(42)).toEqual({
      type: 'TYPE',
      payload: 42,
      meta: { taskId: 3 },
    });
  });
});
