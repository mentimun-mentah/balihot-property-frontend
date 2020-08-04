import css from "styled-jsx/css";

const DetailPropertyStyle = css`
  :global(.for-sale-badge) {
    background: #ff385c;
  }
  :global(.gallery-modal .gallery) {
    display: unset;
    height: 100%;
    padding-bottom: 0;
  }
  :global(.gallery-main > button:focus, .caption-right > button:focus) {
    outline: unset;
  }
  :global(.btn-share-like) {
    color: #6c757d !important;
    font-size: 14px;
    background-color: transparent;
    border: 0px;
    border-radius: 8px !important;
  }
  :global(.btn-share-like:hover) {
    background: rgb(247, 247, 247) !important;
    color: #000 !important;
  }
  /*### IMAGES ###*/
  :global(.row-ml-9px) {
    margin-left: -9px;
  }
  :global(.show-btn){
    position: absolute;
    bottom: 10px;
    right: 8px;
  }
  :global(.image-btn, .video-btn){
    background: rgb(255, 255, 255) !important;
    color: rgb(34, 34, 34) !important;
    font-weight: 600 !important;
    font-size: 14px;
    padding: 7px 15px;
    border-color: rgb(34, 34, 34) !important;
    cursor: pointer;
    border-radius: 5px;
  }
  .show-image {
    position: absolute;
    top: 85%;
    left: 70%;
    z-index: 10;
    background: rgb(255, 255, 255) !important;
    color: rgb(34, 34, 34) !important;
    font-weight: 600 !important;
    font-size: 14px;
    padding: 7px 15px;
    border-color: rgb(34, 34, 34) !important;
    cursor: pointer;
    border-radius: 5px;
  }
  :global(.image-left-radius > .smooth-image-wrapper img) {
    border-radius: 15px 0px 0px 15px;
  }
  :global(.image-tp-rt > .smooth-image-wrapper img) {
    border-radius: 0px 15px 0px 0px;
  }
  :global(.image-tp-btm > .smooth-image-wrapper img) {
    border-radius: 0px 0px 15px 0px;
  }
  /*### IMAGES ###*/
  /*## PROPERTY OVERVIEW ##*/
  .property-overview {
    padding: 10px 30px 20px 30px;
  }
  .property-overview > ul {
    padding: 0;
  }
  .property-overview ul li {
    float: left;
    width: 33%;
    list-style: none;
  }
  .property-overview ul li h4 {
    color: #242526;
    font-size: 14px;
    display: inline-block;
  }
  .property-overview ul li span {
    display: inline-block;
    color: #67686c;
    font-size: 14px;
    padding-left: 1px;
  }
  :global(.property-overview h4 span) {
    color: #67686c;
    font-size: 14px;
    padding-left: 1px;
  }
  .property-overview h3 {
    color: rgb(34, 34, 34) !important;
    font-size: 22px !important;
    margin-bottom: 16px;
    margin-top: 20px;
  }
  /*## PROPERTY OVERVIEW ##*/
  /*## DISTANCE TO##*/
  .property-distance {
    padding: 10px 30px 20px 30px;
  }
  .property-distance > ul {
    padding: 0;
  }
  .property-distance ul li {
    float: left;
    width: 33%;
    list-style: none;
  }
  .property-distance ul li h4 {
    color: #242526;
    font-size: 14px;
    display: inline-block;
  }
  .property-distance ul li span {
    display: inline-block;
    color: #67686c;
    font-size: 14px;
    padding-left: 1px;
  }
  .property-distance h3 {
    color: rgb(34, 34, 34) !important;
    font-size: 22px !important;
    margin-bottom: 16px;
    margin-top: 20px;
  }
  /*## DISTANCE TO##*/
  /*## PROPERTY DESC ##*/
  .property-content-title {
    color: rgb(34, 34, 34) !important;
    font-size: 22px !important;
  }
  .property-description {
    padding: 10px 30px 20px 30px;
  }
  .property-description h3 {
    margin-top: 20px;
  }
  /*## PROPERTY DESC ##*/
  /*## PROPERTY AMENTIES ##*/
  :global(.prop-label) {
    color: #968080;
  }
  :global(.show-amenities) {
    background: rgb(255, 255, 255) !important;
    color: rgb(34, 34, 34) !important;
    border-color: rgb(34, 34, 34) !important;
    border-radius: 5px;
  }
  .property-amenities {
    padding: 10px 30px 20px 30px;
  }
  .property-amenities > ul {
    padding: 0px;
  }
  .property-amenities ul li {
    float: left;
    width: 33%;
    margin-bottom: 15px;
    list-style: none;
  }
  .property-amenities ul li h4 {
    color: #242526;
    font-size: 14px;
    display: inline-block;
  }
  .property-amenities ul li span {
    display: inline-block;
    color: #67686c;
    font-size: 14px;
    padding-left: 1px;
  }
  .property-amenities h3 {
    margin-top: 20px;
    color: rgb(34, 34, 34) !important;
    font-size: 22px !important;
    margin-bottom: 16px;
  }
  /*## PROPERTY AMENTIES ##*/
  /*## INQUIRY ##*/
  .avatar {
    vertical-align: middle;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid white;
    object-fit: cover;
    object-position: 0px 0px;
  }
  :global(.rounded-inquiry) {
    border-radius: 10px;
  }
  :global(.btn-call, .btn-call:hover, .btn-call:not(:disabled):not(.disabled):active) {
    background-color: #021927;
    color: white;
    border-radius: 6px;
    border-color: #021927;
    font-size: 18px;
    box-shadow: 0 0 0 0rem rgba(38, 143, 255, 0);
  }
  :global(.btn-call:focus) {
    background-color: #021927;
    border-color: #021927;
    color: white;
    box-shadow: 0 0 0 0rem rgba(38, 143, 255, 0);
  }
  :global(.btn-red, .btn-red:hover, .btn-red:not(:disabled):not(.disabled):active) {
    background-color: #fc384a;
    color: white;
    border-radius: 6px;
    border-color: #fc384a;
    box-shadow: 0 0 0 0rem rgba(38, 143, 255, 0);
  }
  :global(.btn-red:focus) {
    background-color: #fc384a;
    border-color: #fc384a;
    color: white;
    box-shadow: 0 0 0 0rem rgba(38, 143, 255, 0);
  }
  /*## INQUIRY ##*/
  /*## PROPERTY CONTENT ##*/
  :global(.property-content) {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
  }
  :global(.property-inquiry) {
    position: sticky;
    top: 5.5rem;
  }
  :global(.property-content::-webkit-scrollbar) {
    display: none;
  }
  /*## PROPERTY CONTENT ##*/
  /*CAROUSEL*/
  :global(.btn-carousel) {
    color: rgb(34, 34, 34) !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
    cursor: pointer !important;
    align-items: center !important;
    justify-content: center !important;
    background-clip: padding-box !important;
    box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px,
      rgba(0, 0, 0, 0.18) 0px 2px 4px !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
    transition: box-shadow 0.2s ease 0s, -ms-transform 0.25s ease 0s,
      -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s !important;
  }
  :global(.btn-carousel:hover) {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12) !important;
  }
  /*CAROUSEL*/
  /*### SHOW ALL PHOTO ###*/
  :global(.modal-show-photo > .modal-dialog) {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important;
  }
  :global(.modal-show-photo > .modal-dialog > .modal-content) {
    height: auto !important;
    min-height: 100% !important;
    border-radius: 0 !important;
    background-color: #ececec !important;
  }
  /*### SHOW ALL PHOTO ###*/
`;
export default DetailPropertyStyle;

export const responsiveSimilarListing = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1023, min: 576},
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 30,
  }
};
