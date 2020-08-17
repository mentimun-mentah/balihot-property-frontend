import { useSelector } from "react-redux";
import CardMarker from "./CardMarker";
const CardMarkerMemo = React.memo(CardMarker);

const ContainerCardProperty = ({ dataProperty }) => {
  const {id, slug, name, images, property_for, type_id, bedroom, bathroom, land_size, building_size} = dataProperty;
  const {status, period, price, hotdeal, location, created_at} = dataProperty;

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
  
  return (
    <CardMarkerMemo id={id} slug={slug} name={name} images={images} property_for={property_for}
      type_id={type_id} bedroom={bedroom} bathroom={bathroom} land_size={land_size} 
      building_size={building_size} status={status} period={period} price={price} hotdeal={hotdeal}
      villaPriceList={villaPrice} selectedPrice={villaPrice[0]} landPriceList={landPrice} 
      location={location} created_at={created_at}
      VILLA_CHECK_ID={VILLA_CHECK_ID} LAND_CHECK_ID={LAND_CHECK_ID}
    />
  )
};

export default ContainerCardProperty;
