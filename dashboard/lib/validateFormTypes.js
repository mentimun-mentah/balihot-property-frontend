import validator from 'validator'

export const formIsValid = (type, setType) => {
  const name = { ...type.name };
  let isGood = true;

  if (validator.isEmpty(name.value)) {
    name.isValid = false;
    name.message = "Name can't be empty";
    isGood = false;
  }
  if (!validator.isLength(name.value, {min: 3, max: 100})) {
    name.isValid = false;
    name.message = "Name must be between 3 and 100 characters";
    isGood = false;
  }
  if (!isGood) setType({ ...type, name });
  return isGood;
};
