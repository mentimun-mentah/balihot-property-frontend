export const updateObject = (oldObject, updateValue) => {
  return { ...oldObject, ...updateValue };
};
export const resetValidation = (initialState, setState) => {
  const state = JSON.parse(JSON.stringify(initialState));
  for (let key in state) {
    if (state[key].hasOwnProperty("isValid")) {
      state[key].isValid = true;
      state[key].message = "";
    }
  }
  setState(state);
};
