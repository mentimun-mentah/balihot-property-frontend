import validator from 'validator';

export const formIsValid = (signin, setSigin) => {
  const email = { ...signin.email };
  const password = { ...signin.password };
  let isGood = true;

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
  if (!isGood) {
    setSigin({ ...signin, email, password });
  }
  return isGood;
};
