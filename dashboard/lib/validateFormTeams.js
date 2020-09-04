import validator from 'validator'
import { message } from "antd";

export const formImageIsValid = (imageList, setImageList) => {
  const image = { ...imageList.image };
  let isGood = true;

  if (image.value.length < 1) {
    image.isValid = false;
    image.message = "Image cannot be empty!";
    message.config({ duration: 1.5, maxCount: 3 });
    message.error("Image cannot be empty!");
    isGood = false;
  }
  if (!isGood) setImageList({ ...imageList, image});
  return isGood;
};

export const formIsValid = (team, setTeam) => {
  const name = { ...team.name };
  const title = { ...team.title };
  const phone = { ...team.phone };
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
  if (validator.isEmpty(title.value)) {
    title.isValid = false;
    title.message = "Title can't be empty";
    isGood = false;
  }
  if (!validator.isLength(title.value, {min: 3, max: 100})) {
    title.isValid = false;
    title.message = "Title must be between 3 and 100 characters";
    isGood = false;
  }
  if (validator.isEmpty(phone.value.toString())) {
    phone.isValid = false;
    phone.message = "Number can't be empty";
    isGood = false;
  }
  if (!validator.isLength(phone.value.toString(), {min: 3, max: 20})) {
    phone.isValid = false;
    phone.message = "Number must be between 3 and 20 characters";
    isGood = false;
  }
  if (!validator.isInt(phone.value.toString())) {
    phone.isValid = false;
    phone.message = "Not valid number";
    isGood = false;
  }
  if (!isGood) setTeam({ ...team, name, phone, title});
  return isGood;
};
