import { getIsFinished, getIsRunning, getData, getError } from '../selectors';

const id = 42;

const createState = (value) => ({
  tasks: {
    [id]: value,
  },
});

describe('selectors', () => {
  it('should check finished selector', () => {
    expect(getIsFinished(createState({ finished: false }), id)).toBe(false);
    expect(getIsFinished(createState({ finished: true }), id)).toBe(true);
    expect(getIsFinished(createState({}), 84)).toBe(false);
  });

  it('should check running selector', () => {
    expect(getIsRunning(createState({ finished: false }), id)).toBe(true);
    expect(getIsRunning(createState({ finished: true }), id)).toBe(false);
    expect(getIsRunning(createState({}), 84)).toBe(false);
  });

  it('should check data selector', () => {
    const data = 'data';

    expect(getData(createState({ data }), id)).toBe(data);
    expect(getData(createState({}), 84)).toBe(null);
  });

  it('should check error selector', () => {
    const error = 'error';

    expect(getError(createState({ error }), id)).toBe(error);
    expect(getError(createState({}), 84)).toBe(null);
  });
});
