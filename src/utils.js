const createIdGenerator = () => {
  let id = 0;

  return () => {
    id += 1;

    return id;
  };
};

export const getId = createIdGenerator();

export const createAction = (type, createMeta) => (payload) => {
  const action = { type };

  if (payload !== undefined) {
    action.payload = payload;
  }

  if (typeof createMeta === 'function') {
    action.meta = createMeta();
  }

  return action;
};

export const pick = (keys, obj) =>
  keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
