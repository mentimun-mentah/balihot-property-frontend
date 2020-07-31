import { useSelector, useDispatch } from "react-redux";
import { withAuth } from "../../../hoc/withAuth"

import swal from "sweetalert";
import axios, { headerCfg } from '../../../lib/axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as actions from "../../../store/actions";
import Container from "react-bootstrap/Container";

import PropertyCard from "../../../components/Card/CardProperty"
import StyleProperty from "../../../components/Property/style"

const PropertyCardMemo = React.memo(PropertyCard);

const ManageProperty = () => {
  const dispatch = useDispatch();
  const dataProperty = useSelector((state) => state.property.property);

  const deletePropertyHandler = id => {
    swal({
      title: "Are you sure?!",
      text: "This will also delete all properties that use this region!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/property/crud/${id}`, headerCfg)
          .then((res) => {
            dispatch(actions.getProperty())
            swal({ title: "Yuhuu!", text: res.data.message, icon: "success", timer: 3000, });
          })
          .catch((err) => {
            if (err.response && err.response.data) {
              const {message} = err.response.data;
              if(message){
                swal({ title: message, text: "", icon: "error", button: "Got it", dangerMode: true, });
              }
            }
          });
      }
    })
  }
  return (
    <>
      <Container fluid>
        <Row>
          {dataProperty && dataProperty.data && dataProperty.data.map(data => {
            const {id, slug, name, images, property_for, type_id, bedroom, bathroom, land_size, building_size} = data;
            const {status, period, price, hotdeal, location} = data;
            let villaPrice = []
            let landPrice = []
            if(type_id == 1){
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
            if(type_id == 2){
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
              <Col xl={4} lg={4} mb={4} sm={6} xs={12} key={id}>
                <PropertyCardMemo id={id} slug={slug} name={name} images={images} property_for={property_for}
                  type_id={type_id} bedroom={bedroom} bathroom={bathroom} land_size={land_size} 
                  building_size={building_size} status={status} period={period} price={price} hotdeal={hotdeal}
                  villaPriceList={villaPrice} selectedPrice={villaPrice[0]} landPriceList={landPrice} 
                  onDelete={() => deletePropertyHandler(id)} location={location}
                />
              </Col>
            )
          })}
        </Row>
      </Container>

      <style jsx>{StyleProperty}</style>
    </>
  );
};

ManageProperty.getInitialProps = async ctx => {
  let resProperty = await axios.get('/properties');
  ctx.store.dispatch(actions.getPropertySuccess(resProperty.data)); 
}

export default withAuth(ManageProperty);
