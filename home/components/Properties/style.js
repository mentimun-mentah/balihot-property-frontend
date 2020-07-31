import css from "styled-jsx/css";

const PropertiesStyle = css`
  :global(.info) {
    padding: 10px;
    text-align: left;
    overflow-wrap: break-word;
  }
  :global(.info .location) {
    font-size: 14px !important;
    max-width: 230px;
  }
  :global(.info .title) {
    font-weight: 400 !important;
    color: rgb(34, 34, 34) !important;
    font-size: 16px !important;
    padding-bottom: 5px;
    max-width: 230px;
  }
  :global(.info .price) {
    color: rgb(34, 34, 34) !important;
    font-weight: 800;
    font-size: 16px !important;
  }
  :global(.card-wrapper) {
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 4.2rem);
  }
  :global(.card-wrapper::-webkit-scrollbar) {
    display: none;
  }
  :global(.map-search-title) {
    font-weight: 600 !important;
    color: rgb(34, 34, 34) !important;
  }
  .text-searching {
    z-index: 10;
    margin: 0 auto;
    top: 2.1rem;
    font-size: 1rem;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 20px;
    align-items: center !important;
    justify-content: center !important;
    background: rgb(255, 255, 255) !important;
    border-radius: 8px !important;
  }
  :global(.dropdown-toggle::after) {
    display: inline-block;
    margin-right: 0px;
    margin-top: 10px !important;
    float: right;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
  :global(.dropdown-text-turncate .text) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 90%;
    display: inline-block;
    vertical-align: middle;
  }
  /*SLIDER*/
  :global(.rc-slider-rail) {
    height: 7px;
  }
  :global(.rc-slider-track) {
    height: 7px;
    background-color: #ff385c;
  }
  :global(.rc-slider-handle) {
    width: 25px;
    height: 25px;
    margin-top: -10px;
    border: 1px solid #c5c5c5;
  }
  :global(.rc-slider-handle:before) {
    background-color: #ff5a5f;
    border-radius: 10px;
    content: "";
    height: 11px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 6px;
    width: 11px;
  }
  :global(.rc-slider-handle:active) {
    border: 1px solid #c5c5c5;
  }
  :global(.rc-slider-handle:hover) {
    border-color: #c5c5c5;
  }
  :global(.rc-slider-handle-dragging) {
    border: 1px solid #c5c5c5;
  }
  :global(.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging) {
    border-color: #c5c5c5;
    box-shadow: 0px 0px 5px 0px rgba(19, 19, 28, 0.2);
  }
  :global(.rc-slider-handle:focus) {
    outline: none;
  }
  :global(.rc-slider-handle-click-focused:focus) {
    border-color: #c5c5c5;
    box-shadow: unset;
  }
  :global(.rc-slider-dot-active) {
    border-color: #c5c5c5;
  }
  /*SLIDER*/
`;

export default PropertiesStyle;
