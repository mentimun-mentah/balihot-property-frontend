import validator from 'validator'
import { message } from "antd";

//========= VALIDATE FORM ==========//
export const propertyImageIsValid = (imageList, setImageList) => {
  const image = {...imageList.image}
  let isGood = true;
  if (image.value.length < 5) {
    image.isValid = false;
    isGood = false;
    message.config({ duration: 1.5, maxCount: 3 });
    message.error("Minimum 5 images!");
  }
  if (!isGood) {
    setImageList({ ...imageList, image})
  }
  return isGood;
}

export const propertyFormIsValid = (property, setProperty, VILLA_CHECK_ID, LAND_CHECK_ID) => {
  const name = {...property.name}
  const type_id = {...property.type_id}
  const region_id = {...property.region_id}
  const property_for = {...property.property_for}
  const land_size = {...property.land_size}
  const youtube = {...property.youtube}
  const description = {...property.description}
  // Property for sale
  const status = {...property.status}
  const freehold_price = {...property.freehold_price}
  const leasehold_price = {...property.leasehold_price}
  const leasehold_period = {...property.leasehold_period}
  // Property for rent 
  const period = {...property.period}
  const daily_price = {...property.daily_price}
  const weekly_price = {...property.weekly_price}
  const monthly_price = {...property.monthly_price}
  const annually_price = {...property.annually_price}
  // For villa
  const facilities = {...property.facilities}
  const bedroom = {...property.bedroom}
  const bathroom = {...property.bathroom}
  const building_size = {...property.building_size}
  // For map
  const location = {...property.location}
  const latitude = {...property.latitude}
  const longitude = {...property.longitude}

  let isGood = true;

  if(validator.isEmpty(name.value)){
    name.isValid = false;
    name.message = "Name can't be empty"
    isGood = false;
  }
  if(!validator.isLength(name.value, {min: 3, max: 100})) {
    name.isValid = false;
    name.message = "Name must be between 3 and 100 characters";
    isGood = false;
  }
  if(type_id.value.length < 1){
    type_id.isValid = false;
    type_id.message = "Type can't be empty"
    isGood = false
  }
  if(region_id.value.length < 1){
    region_id.isValid = false;
    region_id.message = "Region can't be empty"
    isGood = false
  }
  if(property_for.value.length < 1){
    property_for.isValid = false;
    property_for.message = "For data can't be empty"
    isGood = false
  }
  if(validator.isEmpty(land_size.value)){
    land_size.isValid = false;
    land_size.message = "Land size can't be empty";
    isGood = false;
  }
  if(validator.isEmpty(youtube.value)){
    youtube.isValid = false;
    youtube.message = "Youtube link can't be empty"
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

  // PROPERTY FOR SALE
  if(validator.isIn("Sale", property_for.value) && status.value.length < 1){
    status.isValid = false;
    status.message = "Status can't be empty"
    isGood = false
  }
  if(status.value !== null && validator.isIn("Free Hold", status.value) && 
     validator.isEmpty(freehold_price.value === null ? "" : freehold_price.value.toString()) ){
    freehold_price.isValid = false;
    freehold_price.message = type_id.value == LAND_CHECK_ID ? "Price / are can't be empty" : "Free Hold price can't be empty"
    isGood = false;
  }
  if(status.value !== null && validator.isIn("Lease Hold", status.value) &&
     validator.isEmpty(leasehold_price.value === null ? "" : leasehold_price.value.toString()) ){
    leasehold_price.isValid = false;
    leasehold_price.message = type_id.value == LAND_CHECK_ID ? "Price / are / year can't be empty" : "Lease Hold price can't be empty";
    isGood = false;
  }
  if(status.value !== null && validator.isIn("Lease Hold", status.value) && validator.isEmpty(leasehold_period.value)){
    leasehold_period.isValid = false;
    leasehold_period.message = "Leasehold period can't be empty";
    isGood = false;
  }
  
  // PROPERTY FOR RENT
  if(validator.isIn("Rent", property_for.value) && period.value.length < 1){
    period.isValid = false;
    period.message = "Period can't be empty"
    isGood = false;
  }
  if(period.value !== null && period.value.length > 0 && 
     validator.isIn("Daily", period.value) && 
     validator.isEmpty(daily_price.value === null ? "" : daily_price.value.toString()) ){
    daily_price.isValid = false;
    daily_price.message = "Daily price can't be empty"
    isGood = false
  }
  if(period.value !== null && period.value.length > 0 && 
     validator.isIn("Weekly", period.value) && 
     validator.isEmpty(weekly_price.value === null ? "" : weekly_price.value.toString()) ){
    weekly_price.isValid = false;
    weekly_price.message = "Weekly price can't be empty"
    isGood = false
  }
  if(period.value !== null && period.value.length > 0 && 
     validator.isIn("Monthly", period.value) && 
     validator.isEmpty(monthly_price.value === null ? "" : monthly_price.value.toString()) ){
    monthly_price.isValid = false;
    monthly_price.message = "Monthly price can't be empty"
    isGood = false
  }
  if(period.value !== null && period.value.length > 0 && 
     validator.isIn("Annually", period.value) && 
     validator.isEmpty(annually_price.value === null ? "" : annually_price.value.toString()) ){
    annually_price.isValid = false;
    annually_price.message = "Annually price can't be empty"
    isGood = false
  }

  // FOR ANY TYPE EXCEPT VILLA AND LAND
  if(type_id.value !== VILLA_CHECK_ID && type_id.value !== LAND_CHECK_ID && validator.isEmpty(bathroom.value.toString())){
    bathroom.isValid = true;
    bathroom.message = null;
    isGood = true;
  }
  if(type_id.value !== VILLA_CHECK_ID && type_id.value !== LAND_CHECK_ID && validator.isEmpty(bedroom.value.toString())){
    bedroom.isValid = true;
    bedroom.message = null;
    isGood = true;
  }

  // FOR VILLA
  if(type_id.value == VILLA_CHECK_ID && validator.isEmpty(bathroom.value.toString())){
    bathroom.isValid = false;
    bathroom.message = "Bathroom can't be empty";
    isGood = false;
  }
  if(type_id.value == VILLA_CHECK_ID && validator.isEmpty(bedroom.value.toString())){
    bedroom.isValid = false;
    bedroom.message = "Bedroom can't be empty";
    isGood = false;
  }
  if(type_id.value !== LAND_CHECK_ID && validator.isEmpty(building_size.value.toString())){
    building_size.isValid = false;
    building_size.message = "Building size can't be empty";
    isGood = false;
  }
  if(type_id.value !== LAND_CHECK_ID && facilities.value.length < 1){
    facilities.isValid = false;
    facilities.message = "Facility can't be empty";
    isGood = false;
  }

  // FOR MAP
  if(validator.isEmpty(location.value)){
    location.isValid = false;
    location.message = "Location can't be empty"
    isGood = false;
  }
  if(validator.isEmpty(latitude.value.toString()) || validator.isEmpty(longitude.value.toString())){
    location.isValid = false;
    location.message = "Please select the location form the map"
    isGood = false;
  }

  if (!isGood) {
    setProperty({ ...property, name, type_id, region_id, property_for, land_size, youtube, description,
      status, freehold_price, leasehold_price, leasehold_period, period, daily_price, weekly_price, monthly_price, 
      annually_price, bedroom, bathroom, building_size, facilities, location });
  }
  return isGood;
}
//========= VALIDATE FORM ==========//
