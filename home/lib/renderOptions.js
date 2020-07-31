import _ from "lodash";
import { Select } from "antd";
const Option = Select.Option;

export const renderOptions = (emptyArr, arr, obj) => {
  return _.forEach(arr, (val) => emptyArr.push(
    <Option key={obj ? val.id : val} value={obj ? val.id : val}>
      {obj ? val.name : val}
    </Option>
  ))
}
