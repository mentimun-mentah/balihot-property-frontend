import validator from 'validator'

export const formIsValid = (facility, setFacility) => {
  const name = { ...facility.name };
  const icon = { ...facility.icon };
  let isGood = true;

  if (validator.isEmpty(name.value)) {
    name.isValid = false;
    name.message = "Name can't be empty";
    isGood = false;
  }
  if (!validator.isLength(name.value, {min: 3, max: 50})) {
    name.isValid = false;
    name.message = "Name must be between 3 and 50 characters";
    isGood = false;
  }
  if (validator.isEmpty(icon.value)) {
    icon.isValid = false;
    icon.message = "Icon can't be empty";
    isGood = false;
  }
  if (!validator.isLength(icon.value, {min: 3, max: 40})) {
    icon.isValid = false;
    icon.message = "Icon must be between 3 and 40 characters";
    isGood = false;
  }
  if (!isGood) setFacility({ ...facility, name, icon });
  return isGood;
};
