import { Dropdown } from "react-bootstrap";

const DropdownList = ({
  filterData,
  saleData,
  rentData,
  selectedValue,
  setFilterData,
  saleRent = false,
  optional = null,
}) => {
  const onSelectValue = (e) => setFilterData(e);

  let dropdown;
  if (!saleRent) {
    dropdown = (
      <Dropdown.Menu className="dropdown-status">
        {filterData.map((type, i) => {
          return (
            <Dropdown.Item
              className={
                selectedValue === type.name
                  ? "active dropdown-item-status dropdown-text-turncate"
                  : "dropdown-item-status dropdown-text-turncate"
              }
              eventKey={type.name}
              onSelect={onSelectValue}
              key={i}
            >
              <span className="text-item">{type.name}</span>
              <span className="float-md-right check-mark">
                <i className="fad fa-check"></i>
              </span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    );
  }

  if (saleRent) {
    dropdown = (
      <Dropdown.Menu className="dropdown-status">
        <h5 className="dropdown-header fs-12 text-secondary font-weight-bold">FOR SALE</h5>
        {saleData.map((type, i) => {
          return (
            <Dropdown.Item
              className={
                selectedValue === type.name
                  ? "active dropdown-item-status dropdown-text-turncate"
                  : "dropdown-item-status dropdown-text-turncate"
              }
              eventKey={type.name}
              onSelect={onSelectValue}
              key={i}
            >
              <span className="text-item">{type.name}</span>
              <span className="float-md-right check-mark">
                <i className="fad fa-check"></i>
              </span>
            </Dropdown.Item>
          );
        })}
        <Dropdown.Divider className="mx-3" />
        <h5 className="dropdown-header fs-12 text-secondary font-weight-bold">FOR RENT</h5>
        {rentData.map((type, i) => {
          return (
            <Dropdown.Item
              className={
                selectedValue === type.name
                  ? "active dropdown-item-status dropdown-text-turncate"
                  : "dropdown-item-status dropdown-text-turncate"
              }
              eventKey={type.name}
              onSelect={onSelectValue}
              key={i}
            >
              <span className="text-item">{type.name}</span>
              <span className="float-md-right check-mark">
                <i className="fad fa-check"></i>
              </span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    );
  }

  return (
    <>
      <Dropdown className="border rounded" onClick={optional}>
        <Dropdown.Toggle
          id="dropdown-property"
          variant="white"
          className="h-50 w-150 text-left dropdown-text-turncate"
        >
          <span className="text">{selectedValue}</span>
        </Dropdown.Toggle>
        {dropdown}
      </Dropdown>
      <style jsx>{`
        /*DROPDOWN STATUS*/
        :global(.dropdown-status) {
          background-color: #ffffff;
          border-radius: 8px;
          -webkit-box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          -moz-box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          -o-box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          display: none;
          height: auto;
          left: auto !important;
          margin: 0 auto;
          width: 200px;
          max-width: 200px;
          position: absolute;
          right: -20% !important;
          top: 60px !important;
        }
        :global(.dropdown-status:before) {
          background-color: #ffffff;
          content: "";
          height: 20px;
          left: 0;
          margin: 0 auto;
          position: absolute;
          right: 0;
          top: -5px;
          width: 20px;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
          z-index: -1;
        }
        :global(.dropdown-item-status) {
          color: #484848;
          font-size: 12px;
          line-height: 2;
          width: 100%;
        }
        /*DROPDOWN STATUS*/
        :global(.dropdown-text-turncate .text-item) {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 130px;
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </>
  );
};

export default React.memo(DropdownList);
