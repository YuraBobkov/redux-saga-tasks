import reducer from '../reducer';
import { FAILURE, START, SUCCESS } from '../types';

describe('reducer', () => {
  const state = {};
  const id = 42;

  it('should use default state', () => {
    expect(reducer(undefined, { type: 'LOREM' })).toEqual({});
  });

  it('should not update state', () => {
    expect(reducer(state, { type: 'LOREM' })).toBe(state);
  });

  it('should check start task', () => {
    expect(reducer(state, { type: START, payload: { id } })).toEqual({
      [id]: {
        data: null,
        error: null,
        finished: false,
      },
    });
  });

  it('should check finish task', () => {
    const data = 'data';

    expect(reducer(state, { type: SUCCESS, payload: { id, data } })).toEqual({
      [id]: {
        data,
        error: null,
        finished: true,
      },
    });

    expect(reducer(state, { type: SUCCESS, payload: { id } })).toEqual({
      [id]: {
        data: null,
        error: null,
        finished: true,
      },
    });
  });

  it('should check failure task', () => {
    const error = 'error';

    expect(reducer(state, { type: FAILURE, payload: { id, error } })).toEqual({
      [id]: {
        error,
        data: null,
        finished: true,
      },
    });
  });
});
