import validator from 'validator';

export const formIsValid = (enquiry, setEnquiry) => {
  const name = { ...enquiry.name};
  const sender_email = { ...enquiry.sender_email};
  const phone = { ...enquiry.phone};
  const description = { ...enquiry.description};
  let isGood = true;

  if (!validator.isLength(name.value, { min: 3, max: undefined })) {
    name.isValid = false;
    name.message = "Name at least 3 characters";
    isGood = false;
  }
  if (!validator.isEmail(sender_email.value)) {
    sender_email.isValid = false;
    sender_email.message = "Email isn't valid";
    isGood = false;
  }
  if (!validator.isLength(phone.value, { min: 3, max: 20})) {
    phone.isValid = false;
    phone.message = "Length must be between 3 and 20";
    isGood = false;
  }
  if (validator.isEmpty(phone.value.toString())) {
    phone.isValid = false;
    phone.message = "Number can't be empty";
    isGood = false;
  }
  if(validator.isEmpty(description.value)){
    description.isValid = false;
    description.message = "Description can't be empty"
    isGood = false;
  }
  if(!validator.isLength(description.value, {min: 3, max: undefined})) {
    description.isValid = false;
    description.message = "Description at least 3 characters";
    isGood = false;
  }
  if (!isGood) {
    setEnquiry({ ...enquiry, name, sender_email, phone, description});
  }
  return isGood;
};
