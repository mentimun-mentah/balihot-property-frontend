import validator from 'validator';

export const formIsValid = (reset, setReset) => {
  const email = { ...reset.email };
  let isGood = true;

  if (!validator.isEmail(email.value)) {
    email.isValid = false;
    email.message = "Email isn't valid";
    isGood = false;
  }
  if (!isGood) {
    setReset({ ...reset, email });
  }
  return isGood;
};

export const formResetIsValid = (reset, setReset) => {
  const email = { ...reset.email };
  const password = { ...reset.password};
  const confirm_password = { ...reset.confirm_password};
  let isGood = true;

  if (!validator.isEmail(email.value)) {
    email.isValid = false;
    email.message = "Email isn't valid";
    isGood = false;
  }
  if (!validator.isLength(password.value, { min: 6, max: 100})) {
    password.isValid = false;
    password.message = "Password must be between 6 and 100 characters.";
    isGood = false;
  }
  if (!validator.isLength(confirm_password.value, { min: 6, max: 100})) {
    confirm_password.isValid = false;
    confirm_password.message = "Confirm password must be between 6 and 100 characters.";
    isGood = false;
  }
  if (validator.isEmpty(confirm_password.value)) {
    confirm_password.isValid = false;
    confirm_password.message = "Confirm password can't be empty";
    isGood = false;
  }
  if (!validator.equals(confirm_password.value, password.value)) {
    confirm_password.isValid = false;
    confirm_password.message = "Password isn't matches";
    isGood = false;
  }
  if (!isGood) {
    setReset({ ...reset, email, password, confirm_password });
  }
  return isGood;
};
