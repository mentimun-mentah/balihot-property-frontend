import validator from 'validator'
import { message } from "antd";

export const formIsValid = (region, setRegion) => {
  const name = { ...region.name };
  const image = { ...region.image };
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
  if (image.value.length < 1) {
    image.isValid = false;
    image.message = "Image cannot be empty!";
    isGood = false;
    message.config({ duration: 1.5, maxCount: 3 });
    message.error("Image cannot be empty!");
  }
  if (!isGood) setRegion({ ...region, name, image });
  return isGood;
};

export const formDescIsValid = (content, setContent) => {
  const description = { ...content.description };
  let plainText = description.value.replace(/<[^>]+>/g, '');
  let finalText = plainText.replace(/&nbsp;/g, " ");
  let isGood = true;

  if (validator.isEmpty(finalText)) {
    description.isValid = false;
    description.message = "Description can't be empty";
    isGood = false;
  }
  if (!validator.isLength(finalText, {min: 3, max: undefined})) {
    description.isValid = false;
    description.message = "Description minimum 3 characters";
    isGood = false;
  }
  if (!isGood) setContent({ description });
  return isGood;
};
