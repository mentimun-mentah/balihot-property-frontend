import { Select } from "antd";
import _ from 'lodash'

const Option = Select.Option;

export const formImage = {
  image: {value:[], isValid: true, message: null}
};

export const formUpdateImage = {
  image: { value: [], isValid: true, message: null },
}

export const formProperty = {
  name: { value: "", isValid: true, message: null },
  type_id: { value: [], isValid: true, message: null },
  region_id: { value: [], isValid: true, message: null },
  property_for: { value: [], isValid: true, message: null },
  land_size: { value: "", isValid: true, message: null },
  youtube: { value: "", isValid: true, message: null },
  description: { value: "", isValid: true, message: null },
  hotdeal: { value: false, isValid: true, message: null },
  // property for sale
  status: { value: [], isValid: true, message: null },
  freehold_price: { value: "", isValid: true, message: null },
  leasehold_price: { value: "", isValid: true, message: null },
  leasehold_period: { value: "", isValid: true, message: null },
  // property for rent
  period: { value: [], isValid: true, message: null },
  daily_price: { value: "", isValid: true, message: null },
  weekly_price: { value: "", isValid: true, message: null },
  monthly_price: { value: "", isValid: true, message: null },
  annually_price: { value: "", isValid: true, message: null },
  // for villa
  facilities: { value: [], isValid: true, message: null },
  bedroom: { value: "", isValid: true, message: null },
  bathroom: { value: "", isValid: true, message: null },
  building_size: { value: "", isValid: true, message: null },
  // for map
  location: { value: "", isValid: true, message: null },
  latitude: { value: "", isValid: true, message: null },
  longitude: { value: "", isValid: true, message: null }
};

export const for_data = { villa: ["Sale", "Rent"], land: ["Sale"] }; // If type is Land than only Sale
export const period_data = ["Annually", "Monthly", "Weekly", "Daily"]; // If type is Villa
export const status_data = ["Free Hold", "Lease Hold"];

export const renderOptions = (emptyArr, arr, obj) => {
  return _.forEach(arr, (val) => emptyArr.push(
    <Option key={obj ? val.id : val} value={obj ? val.id : val}>
      {obj ? val.name : val}
    </Option>
  ))
}
