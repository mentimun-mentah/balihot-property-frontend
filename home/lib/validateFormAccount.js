import validator from "validator";

export const changePasswordIsValid = (changePassword, setChangePassword) => {
  const old_password = { ...changePassword.old_password };
  const password = { ...changePassword.password };
  const confirm_password = { ...changePassword.confirm_password };
  let isGood = true;

  if (!validator.isLength(old_password.value, { min: 6, max: 100})) {
    old_password.isValid = false;
    old_password.message = "Password at least 6 characters";
    isGood = false;
  }
  if (!validator.isLength(password.value, { min: 6, max: 100})) {
    password.isValid = false;
    password.message = "New Password at least 6 characters";
    isGood = false;
  }
  if (!validator.isLength(confirm_password.value, { min: 6, max: 100})) {
    confirm_password.isValid = false;
    confirm_password.message = "Confirm Password at least 6 characters";
    isGood = false;
  }
  if (!validator.equals(confirm_password.value, password.value)) {
    confirm_password.isValid = false;
    confirm_password.message = "Password isn't matches";
    isGood = false;
  }
  if (!isGood) {
    setChangePassword({ ...changePassword, old_password, password, confirm_password });
  }
  return isGood;
};

export const addPasswordIsValid = (addPassword, setAddPassword) => {
  const password = { ...addPassword.password };
  const confirm_password = { ...addPassword.confirm_password };
  let isGood = true;

  if (!validator.isLength(password.value, { min: 6, max: 100})) {
    password.isValid = false;
    password.message = "Password at least 6 characters";
    isGood = false;
  }
  if (!validator.isLength(confirm_password.value, { min: 6, max: 100})) {
    confirm_password.isValid = false;
    confirm_password.message = "Confirm Password at least 6 characters";
    isGood = false;
  }
  if (!validator.equals(confirm_password.value, password.value)) {
    confirm_password.isValid = false;
    confirm_password.message = "Password isn't matches";
    isGood = false;
  }
  if (!isGood) {
    setAddPassword({ ...addPassword, password, confirm_password });
  }
  return isGood;
};

export const updateAccountIsValid = (changeUsername, setChangeUsername) => {
  const username = { ...changeUsername.username};
  let isGood = true;

  if (!validator.isLength(username.value, { min: 3, max: 100})) {
    username.isValid = false;
    username.message = "Username at least 3 characters";
    isGood = false;
  }
  if (!isGood) {
    setChangeUsername({ ...changeUsername, username });
  }
  return isGood;
};
