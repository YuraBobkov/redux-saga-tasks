import { FAILURE, START, SUCCESS } from './types';

const reducer = (state = {}, { type, payload }) => {
  if (type === START) {
    return {
      ...state,
      [payload.id]: {
        finished: false,
        data: null,
        error: null,
      },
    };
  }

  if (type === SUCCESS) {
    return {
      ...state,
      [payload.id]: {
        finished: true,
        data: payload.data || null,
        error: null,
      },
    };
  }

  if (type === FAILURE) {
    return {
      ...state,
      [payload.id]: {
        finished: true,
        data: null,
        error: payload.error,
      },
    };
  }

  return state;
};

export default reducer;
