import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-multi-carousel";

import PropertyCard from "./CardProperty";
import { responsiveSimilarListing } from "../DetailProperty/style.js";
import LoadingCard from "./LoadingCard";

const PropertyCardMemo = React.memo(PropertyCard)

/*carousel*/
const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="carousel-button-group d-none">
      <Button
        id="prevCarouselClick"
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
      >
        Prev
      </Button>
      <Button id="nextCarouselClick" onClick={() => next()}>
        Next
      </Button>
    </div>
  );
};
/*carousel*/

const ContainerCardProperty = ({ dataProperty }) => {
  const loading = useSelector(state => state.property.loading)
  const dataType = useSelector((state) => state.types.types);

  let VILLA_CHECK_ID = null;
  let LAND_CHECK_ID = null;

  for(let key in dataType){
    if(dataType[key].name.toLowerCase() === "villa"){
      VILLA_CHECK_ID = dataType[key].id
    }
    if(dataType[key].name.toLowerCase() === "land"){
      LAND_CHECK_ID = dataType[key].id
    }
  }

  return (
    <>
    <div className="d-block d-sm-block d-md-none">
      <Carousel
        responsive={responsiveSimilarListing}
        ssr={true}
        infinite
        partialVisible={true}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
        arrows={false}
      >
        {dataProperty.map(data => {
          const {id, slug, name, images, property_for, type_id, bedroom, bathroom, land_size, building_size} = data;
          const {status, period, price, hotdeal, location, created_at, love} = data;
          let villaPrice = []
          let landPrice = []
          if(type_id !== LAND_CHECK_ID){
            let tmp = []
            for(let key in price){
              if(price[key]){
                let name = key.split('_')[0]
                if(name == 'leasehold'){
                  tmp.push(price[key])
                }
                if(name == 'freehold'){
                  villaPrice.push({
                    name: "Free Hold",
                    price: price[key]
                  })
                }
                if(name != 'freehold' && name != 'leasehold'){
                  villaPrice.push({
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    price: price[key]
                  })
                }
              }
            }
            if(tmp.length > 0){
              villaPrice.push({
                name: 'Lease Hold',
                price: typeof(tmp[0]) === "number" ? tmp[0] : tmp[1],
                period: typeof(tmp[1]) === "string" ? tmp[1] : tmp[0]
              })
            }
          }
          if(villaPrice.length > 1){
            for(let key in villaPrice){
              let tmp = []
              if(villaPrice[key].name == "Free Hold" && key !== 0){
                tmp.push(villaPrice[0])
                villaPrice[0] = villaPrice[key]
                villaPrice[key] = tmp[0]
                tmp = []
              }
              if(villaPrice[key].name == "Lease Hold" && key !== 1){
                tmp.push(villaPrice[1])
                villaPrice[1] = villaPrice[key]
                villaPrice[key] = tmp[0]
                tmp = []
              }
            } 
          }
          if(type_id == LAND_CHECK_ID){
            let tmp = []
            for(let key in price){
              if(price[key]){
                let name = key.split('_')[0]
                if(name == 'leasehold'){
                  tmp.push(price[key])
                }
                if(name == 'freehold'){
                  landPrice.push({
                    name: "Free Hold",
                    price: price[key]
                  })
                }
              }
            }
            if(tmp.length > 0){
              landPrice.push({
                name: 'Lease Hold',
                price: typeof(tmp[0]) === "number" ? tmp[0] : tmp[1],
                period: typeof(tmp[1]) === "string" ? tmp[1] : tmp[0]
              })
            }
          }
        
          return(
            <Col key={id} className="px-1">
              {loading ? (
                <LoadingCard />
              ) : (
                <PropertyCardMemo id={id} slug={slug} name={name} images={images} property_for={property_for}
                  type_id={type_id} bedroom={bedroom} bathroom={bathroom} land_size={land_size} 
                  building_size={building_size} status={status} period={period} price={price} hotdeal={hotdeal}
                  villaPriceList={villaPrice} selectedPrice={villaPrice[0]} landPriceList={landPrice} 
                  location={location} created_at={created_at} love={love}
                  VILLA_CHECK_ID={VILLA_CHECK_ID} LAND_CHECK_ID={LAND_CHECK_ID}
                />
              )}
            </Col>
          )
        })}
      </Carousel>
    </div>
    <div className="d-none d-sm-none d-md-block">
      <Carousel
        responsive={responsiveSimilarListing}
        ssr={true}
        infinite
        centerMode
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
        arrows={false}
      >
        {dataProperty.map(data => {
          const {id, slug, name, images, property_for, type_id, bedroom, bathroom, land_size, building_size} = data;
          const {status, period, price, hotdeal, location, created_at, love} = data;
          let villaPrice = []
          let landPrice = []
          if(type_id !== LAND_CHECK_ID){
            let tmp = []
            for(let key in price){
              if(price[key]){
                let name = key.split('_')[0]
                if(name == 'leasehold'){
                  tmp.push(price[key])
                }
                if(name == 'freehold'){
                  villaPrice.push({
                    name: "Free Hold",
                    price: price[key]
                  })
                }
                if(name != 'freehold' && name != 'leasehold'){
                  villaPrice.push({
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    price: price[key]
                  })
                }
              }
            }
            if(tmp.length > 0){
              villaPrice.push({
                name: 'Lease Hold',
                price: typeof(tmp[0]) === "number" ? tmp[0] : tmp[1],
                period: typeof(tmp[1]) === "string" ? tmp[1] : tmp[0]
              })
            }
          }
          if(villaPrice.length > 1){
            for(let key in villaPrice){
              let tmp = []
              if(villaPrice[key].name == "Free Hold" && key !== 0){
                tmp.push(villaPrice[0])
                villaPrice[0] = villaPrice[key]
                villaPrice[key] = tmp[0]
                tmp = []
              }
              if(villaPrice[key].name == "Lease Hold" && key !== 1){
                tmp.push(villaPrice[1])
                villaPrice[1] = villaPrice[key]
                villaPrice[key] = tmp[0]
                tmp = []
              }
            } 
          }
          if(type_id == LAND_CHECK_ID){
            let tmp = []
            for(let key in price){
              if(price[key]){
                let name = key.split('_')[0]
                if(name == 'leasehold'){
                  tmp.push(price[key])
                }
                if(name == 'freehold'){
                  landPrice.push({
                    name: "Free Hold",
                    price: price[key]
                  })
                }
              }
            }
            if(tmp.length > 0){
              landPrice.push({
                name: 'Lease Hold',
                price: typeof(tmp[0]) === "number" ? tmp[0] : tmp[1],
                period: typeof(tmp[1]) === "string" ? tmp[1] : tmp[0]
              })
            }
          }
        
          return(
            <Col key={id} className="px-1">
              {loading ? (
                <LoadingCard />
              ) : (
                <PropertyCardMemo id={id} slug={slug} name={name} images={images} property_for={property_for}
                  type_id={type_id} bedroom={bedroom} bathroom={bathroom} land_size={land_size} 
                  building_size={building_size} status={status} period={period} price={price} hotdeal={hotdeal}
                  villaPriceList={villaPrice} selectedPrice={villaPrice[0]} landPriceList={landPrice} 
                  location={location} created_at={created_at} love={love}
                  VILLA_CHECK_ID={VILLA_CHECK_ID} LAND_CHECK_ID={LAND_CHECK_ID}
                />
              )}
            </Col>
          )
        })}
      </Carousel>
    </div>
    <style jsx>{`
      :global(.custom-arrow-right, .custom-arrow-left){
        outline: 0px;
        transition: all 0.5s ease 0s;
        border-radius: 50%;
        border: 0px;
        background: #ffffff4d;
        color: #6a6a6a8a;
        width: 30px;
        height: 30px;
        min-width: 30px;
        min-height: 30px;
        max-width: 30px;
        max-height: 30px;
      }
      :global(.custom-arrow-right){
        margin-right: 5px;
      }
      :global(.custom-arrow-left){
        margin-left: 5px;
      }
      :global(.custom-arrow-right:hover, .custom-arrow-left:hover, 
        .custom-arrow-right:focus, .custom-arrow-left:focus) {
        border-radius: 50% !important;
        border: 0px !important;
        background: #ffffffdb;
        color: #6a6a6a;
      }
    `}</style>
    </>
  );
};

export default ContainerCardProperty;
