import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from 'antd';
import { withAuth } from "../../../hoc/withAuth"
import { pagination_iter } from "../../../lib/paginationIter.js"

import swal from "sweetalert";
import axios, { jsonHeaderHandler } from '../../../lib/axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from 'react-bootstrap/Pagination'
import * as actions from "../../../store/actions";
import Container from "react-bootstrap/Container";
import CardEmpty from "../../../components/Card/CardEmpty";

import PropertyCard from "../../../components/Card/CardProperty"

const PropertyCardMemo = React.memo(PropertyCard);

const ManageProperty = () => {
  const dispatch = useDispatch();
  const dataProperty = useSelector((state) => state.property.property);
  const dataType = useSelector((state) => state.types.types);
  const [active, setActive] = useState(dataProperty.page)
  const [search, setSearch] = useState('')

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

  const searchChangeHandler = e => {
    setSearch(e.target.value)
    setActive(1)
  }

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
          .delete(`/property/crud/${id}`, jsonHeaderHandler() )
          .then((res) => {
            dispatch(actions.getProperty(''))
            swal({ title: "Success", text: res.data.message, icon: "success", timer: 3000, });
          })
          .catch((err) => {
            if (err.response && err.response.data) {
              const {message} = err.response.data;
              if(message){
                swal({ title: message, text: "", icon: "error", button: "Got it", dangerMode: true, });
              } else {
                swal({ title: "Upps!", icon: "error", timer: 3000, });
              }
            }
          });
      }
    })
  }


  //====== PAGINATION ======//
  const pageHandler = (event) => {
    setActive(+event.target.text);
  };
  const prevHandler = () => {
    setActive(dataProperty.prev_num);
  };
  const nextHandler = () => {
    setActive(dataProperty.next_num);
  };
  let pagination = []; let iter_data;
  if(dataProperty.iter_pages && dataProperty.iter_pages.length > 0) iter_data = dataProperty.iter_pages.slice(-1)[0]
  for(let n of pagination_iter(dataProperty.page, iter_data)){
    let click = pageHandler;
    if (n === +active) click = null;
    if(n === "..."){
      pagination.push(
        <Pagination.Ellipsis key={n + Math.random} disabled />
      )
    } else {
      pagination.push(
        <Pagination.Item key={n + Math.random} active={n === +active} text={n} onClick={click}>
          {n}
        </Pagination.Item>,
      );
    }
  }

  //====== PAGINATION ======//
  
  useEffect(() => {
    let q = '?'
    if(active) q +=`page=${active}&per_page=6&`
    if(search) q += `prop_id=${search}`

    dispatch(actions.getProperty(q))
  },[active, search])

  return (
    <>
      <Container fluid>
        <Row className="mt--2 mt-lg--4 mb-4 justify-content-end">
          <Col className="col-md-auto col-lg-auto col-xl-auto col-sm-12 col-12 align-self-center">
            <Input.Search 
              type="number" 
              className="search-code" 
              placeholder="Search property ID" 
              onChange={searchChangeHandler}
              value={search}
              enterButton 
            />
          </Col>
        </Row>

        <Row>
          {dataProperty && dataProperty.data && dataProperty.data.length > 0 ?
            dataProperty.data.map(data => {
            const {id, type, slug, name, images, property_for, type_id} = data;
            const {bedroom, bathroom, land_size, building_size} = data;
            const {status, period, price, hotdeal, location} = data;
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
              <Col xl={4} lg={6} md={12} sm={12} xs={12} key={id}>
                <PropertyCardMemo id={id} type={type} slug={slug} name={name} 
                  images={images} property_for={property_for}
                  type_id={type_id} bedroom={bedroom} bathroom={bathroom} land_size={land_size} 
                  building_size={building_size} status={status} period={period} price={price} hotdeal={hotdeal}
                  villaPriceList={villaPrice} selectedPrice={villaPrice[0]} landPriceList={landPrice} 
                  onDelete={() => deletePropertyHandler(id)} location={location} VILLA_CHECK_ID={VILLA_CHECK_ID}
                  LAND_CHECK_ID={LAND_CHECK_ID}
                />
              </Col>
            )
          }) : (
            <Container>
              <CardEmpty 
                cardClass="text-muted mt-4 pt-5 pb-5 shadow-none border-0"
                img="/static/images/no-property.png"
                imgClass="img-size mx-auto"
                titleClass="text-center text-black-50"
                title="There is no property"
              />
            </Container>
          )}

          {dataProperty.iter_pages && dataProperty.iter_pages.length > 0 && dataProperty.iter_pages.length > 1 && (
            <Col className="col-12 mt-3 mb-5">
              <Pagination className="justify-content-center">
                <Pagination.Prev onClick={prevHandler} disabled={dataProperty.prev_num === null} />
                  {pagination}
                <Pagination.Next onClick={nextHandler} disabled={dataProperty.next_num === null} />
              </Pagination>
            </Col>
          )}

        </Row>
      </Container>

      <style jsx>{`
        @media (min-width: 768px) {
          :global(.search-code) {
            width: 300px !important;
          }
        }
        :global(.search-code .ant-btn-primary){
          background: #ff385c;
          border-color: #ff385c;
        }
        :global(.search-code .ant-input-search-enter-button input:hover, 
                .search-code .ant-input-search-enter-button input:focus){
          border-color: #d9d9d9;
        }
        :global(.search-code .ant-input:focus, .search-code .ant-input-focused){
          box-shadow: unset;
        }
      `}
      </style>
    </>
  );
};

ManageProperty.getInitialProps = async ctx => {
  let resProperty = await axios.get('/properties?per_page=6');
  ctx.store.dispatch(actions.getPropertySuccess(resProperty.data)); 
  let resType = await axios.get('/types');
  ctx.store.dispatch(actions.getTypeSuccess(resType.data)); 
}

export default withAuth(ManageProperty);
