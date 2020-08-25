import validator from 'validator'
import { message } from "antd";

export const formIsValid = (news, setNews) => {
  const image = { ...news.image };
  const title = { ...news.title};
  const short_description = { ...news.short_description};
  let isGood = true;

  if (image.value.length < 1) {
    image.isValid = false;
    image.message = "Image cannot be empty!";
    isGood = false;
    message.config({ duration: 1.5, maxCount: 3 });
    message.error("Image cannot be empty!");
  }
  if (validator.isEmpty(title.value)) {
    title.isValid = false;
    title.message = "Title can't be empty";
    isGood = false;
  }
  if (validator.isEmpty(short_description.value)) {
    short_description.isValid = false;
    short_description.message = "Short description can't be empty";
    isGood = false;
  }
  if (!isGood) setNews({ ...news, image, title, short_description });
  return isGood;
};

export const formDescIsValid = (content, setContent) => {
  const description = { ...content.description };
  let plainText = description.value.replace(/<[^>]+>/g, '');
  let isGood = true;

  if (validator.isEmpty(plainText)) {
    description.isValid = false;
    description.message = "Description can't be empty";
    isGood = false;
  }
  if (!validator.isLength(plainText, {min: 3, max: undefined})) {
    description.isValid = false;
    description.message = "Description minimum 3 characters";
    isGood = false;
  }
  if (!isGood) setContent({ description });
  return isGood;
};
