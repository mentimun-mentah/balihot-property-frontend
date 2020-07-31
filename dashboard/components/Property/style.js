import css from "styled-jsx/css";

const PropertyStyle = css`
  :global(.react-tag-input) {
    min-height: calc(2.75rem + 2px);
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #cad1d7;
    border-radius: 0.375rem;
  }
  :global(.react-tag-input__input::placeholder) {
    color: #8898aa;
    font-size: 0.875rem;
  }
  :global(.ant-select
      .ant-select-lg
      .ant-select-single
      .ant-select-show-arrow) {
    line-height: 2.5 !important;
  }
  :global(.ant-select-multiple .ant-select-selector, .ant-select
      .ant-select-selector, .ant-picker) {
    border-radius: 0.375rem !important;
    padding: 3px 6px !important;
    border: unset;
    max-height: 85px;
    overflow: auto;
  }
  :global(.for_what_select > .ant-select-selector) {
    height: 44px;
  }
  :global(.custom_select .ant-select-selector, .ant-picker) {
    height: 44px;
    overflow: auto;
  }
  :global(.ant-select-multiple .ant-select-selection-item-remove) {
    line-height: 2.5;
  }
  :global(.ant-select:not(.ant-select-disabled):hover
      .ant-select-selector) {
  }
  :global(.ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector, .ant-input-number-input) {
    height: 44px;
    border: unset;
  }
  :global(.ant-select, .ant-picker, .ant-input-number) {
    color: #8898aa;
    font-size: 0.875rem;
    border: 1px solid #cad1d7;
    border-radius: 0.375rem !important;
  }
  :global(.ant-select.is-invalid, .ant-picker.is-invalid, .ant-input-number.is-invalid) {
    border-color: #fb6340;
  }
  :global(.ant-select-single.ant-select-lg:not(.ant-select-customize-input)
      .ant-select-selector
      .ant-select-selection-placeholder) {
    color: #2a3b4e;
    font-size: 0.875rem;
  }
  :global(.ant-picker-input > input:placeholder-shown, .ant-picker-large
      .ant-picker-input
      > input) {
    color: #8898aa !important;
    font-size: 0.875rem !important;
  }
  :global(.ant-input-number:hover .ant-input-number-handler-wrap) {
    opacity: 0;
  }

  :global(.custom-arrow) {
    position: absolute;
    outline: 0px;
    transition: all 0.5s ease 0s;
    border-radius: 35px;
    z-index: 2;
    border: 0px;
    background: #ffffff4d;
    color: #6a6a6a8a;
    min-width: 30px;
    min-height: 30px;
    opacity: 1;
    cursor: pointer;
    top: 45%;
    right: 5px;
    padding-top: 4px;
  }
  :global(.custom-arrow:hover) {
    background: #ffffffdb;
    color: #6a6a6a;
  }

  :global(.z-i-1) {
    z-index: -1;
  }
  .rate-info {
    float: left;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 40px 23px 20px 23px;
    z-index: 2;
  }
  .rate-info:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.02),
      rgba(44, 44, 47, 47)
    );
    z-index: -1;
  }
  .img-block {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
  }
  .img-block h5,
  .map-box .rate-info > h5 {
    margin: 0px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    float: left;
    /* padding-left: 24px; */
    position: relative;
    top: 5px;
  }
  :global(.card .img-block span, .map-box .rate-info > span) {
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    background: rgba(145, 147, 152, 0.7);
    border-radius: 50px;
    padding: 5px 13px;
    float: right;
    /* margin-right: 24px; */
    margin-top: 2px;
  }
  :global(.card .img-block span.for-sale, .map-box
      .rate-info
      > span.for-sale) {
    background: #ff385c;
  }
  :global(.card .img-block span.for-rent, .map-box
      .rate-info
      > span.for-rent) {
    background: #551a8b;
  }
  /*AWS SLIDER*/
  :global(.awssld__controls__arrow-left, .awssld__controls__arrow-right) {
    height: 13px;
  }
  :global(.awssld__controls button) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ffffff4d;
  }
  :global(.awssld__controls button:hover) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ffffffdb;
  }
  :global(.awssld__controls__arrow-right:before, .awssld__controls__arrow-right:after) {
    right: 2px !important;
    border-radius: 10px;
  }
  :global(.awssld__controls__arrow-left:before, .awssld__controls__arrow-left:after) {
    left: 2px !important;
    border-radius: 10px;
  }
  /*AWS SLIDER*/

  :global(.badge) {
    font-size: 85%;
    text-transform: unset;
  }
  :global(.card-footer) {
    padding: 0.75rem 1.25rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.125);
  }
  .top-left span {
    position: absolute;
    top: 8px;
    right: 25px;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    background: rgba(145, 147, 152, 0.7);
    border-radius: 0px;
    padding: 5px 13px;
    float: right;
  }
  .top-left span.for-sale {
    background: #ff385c;
  }
  .top-left span.for-rent {
    background: #551a8b;
  }
`

export default PropertyStyle
