import { getId, createAction, pick } from '../utils';

test('ID generation', () => {
  expect(getId()).toBe(1);
  expect(getId()).toBe(2);
  expect(getId()).toBe(3);
});

describe('creating action', () => {
  const action = createAction('TYPE');
  const actionWithMeta = createAction('TYPE', () => 'foo');

  it('should create action without payload', () => {
    expect(action()).toEqual({ type: 'TYPE' });
  });

  it('should create action with payload', () => {
    expect(action(null)).toEqual({ type: 'TYPE', payload: null });
    expect(action(42)).toEqual({ type: 'TYPE', payload: 42 });
  });

  it('should create action without payload and with meta', () => {
    expect(actionWithMeta()).toEqual({ type: 'TYPE', meta: 'foo' });
  });

  it('should create action with payload and meta', () => {
    expect(actionWithMeta(null)).toEqual({
      type: 'TYPE',
      payload: null,
      meta: 'foo',
    });
    expect(actionWithMeta(42)).toEqual({
      type: 'TYPE',
      payload: 42,
      meta: 'foo',
    });
  });
});

test('get object with the specified keys', () => {
  const object = { foo: 'bar', baz: 'quux', xyzzy: 'plugh' };

  expect(pick([], object)).toEqual({});
  expect(pick(['hello'], object)).toEqual({});
  expect(pick(['foo'], object)).toEqual({ foo: 'bar' });
  expect(pick(['foo', 'xyzzy'], object)).toEqual({
    foo: 'bar',
    xyzzy: 'plugh',
  });
});
