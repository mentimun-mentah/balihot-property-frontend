import validator from 'validator';

export const formIsValid = (signup, setSignup) => {
  const username = { ...signup.username };
  const email = { ...signup.email };
  const password = { ...signup.password };
  const confirm_password = { ...signup.confirm_password };
  let isGood = true;

  if (!validator.isLength(username.value, { min: 3, max: undefined })) {
    username.isValid = false;
    username.message = "Username at least 3 characters";
    isGood = false;
  }
  if (!validator.isEmail(email.value)) {
    email.isValid = false;
    email.message = "Email isn't valid";
    isGood = false;
  }
  if (!validator.isLength(password.value, { min: 6, max: undefined })) {
    password.isValid = false;
    password.message = "Password at least 6 characters";
    isGood = false;
  }
  if (validator.isEmpty(confirm_password.value)) {
    confirm_password.isValid = false;
    confirm_password.message = "Password can't be empty";
    isGood = false;
  }
  if (!validator.equals(confirm_password.value, password.value)) {
    confirm_password.isValid = false;
    confirm_password.message = "Password isn't matches";
    isGood = false;
  }
  if (!isGood) {
    setSignup({ ...signup, username, email, password, confirm_password });
  }
  return isGood;
};
