import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'
import Container from 'react-bootstrap/Container'
import ContainerCardProperty from "../Card/ContainerCardProperty";
import * as actions from "../../store/actions";

import { useDispatch, useSelector } from "react-redux";
import { Select } from 'antd';
import { motion } from "framer-motion";
import { Fade } from "../Transition";
import { renderOptions } from "../../lib/renderOptions";
import { pagination_iter } from "../../lib/paginationIter";

const { Option } = Select;

const formFilter = {
  type_id: { value: [] },
  status: { value: [] },
}

const period_data = ["Annually", "Monthly", "Weekly", "Daily"];
const status_data = ["Free Hold", "Lease Hold"];

const Shortlist = () => {
  const dispatch = useDispatch()

  const property = useSelector(state => state.property.property)
  const dataType = useSelector((state) => state.types.types);

  const [filter, setFilter] = useState(formFilter)
  const [active, setActive] = useState(property.page);

  const type_list = []; renderOptions(type_list, dataType, true);
  const status_list = []; renderOptions(status_list, status_data.concat(period_data))

  const searchChangeHandler = (e, category) => {
    if (category === "type_id") {
      const data = { 
        ...filter, 
        type_id: { value: e }, 
      };
      setFilter(data);
      setActive(1)
    }
    if (category === "status") {
      const data = { 
        ...filter, 
        status: { value: e },
      };
      setFilter(data);
      setActive(1)
    }
  }

  const { type_id, status } = filter;

  useEffect(() => {
    let q = '?'
    if(active) q = q + `page=${active}&per_page=6&`
    if(type_id.value) if(type_id.value.length !== 0) q = q + `type_id=${type_id.value}&`
    if(status.value) if(status.value.length !== 0) {
      if(status_data.includes(status.value)){
        q = q + `status=${status.value}`
      }
      if(period_data.includes(status.value)){
        q = q + `period=${status.value}`
      }
    }
    dispatch(actions.getWishlist(q))
  },[type_id.value, status.value, active])

  //====== PAGINATION ======//
  const pageHandler = (event) => {
    setActive(+event.target.text);
  };
  const prevHandler = () => {
    setActive(property.prev_num);
  };
  const nextHandler = () => {
    setActive(property.next_num);
  };
  let pagination = []; let iter_data;
  if(property.iter_pages && property.iter_pages.length > 0) iter_data = property.iter_pages.slice(-1)[0]
  for (let n of pagination_iter(property.page, iter_data)) {
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
  
  return (
    <>
      <Col md={12} lg={10} className="ml-sm-auto pl-0 p-r-0-s">
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <Card className="border-0 mt-5 hov_none shadow-none mb-5">
            <Card.Header className="bg-transparent">
              <h1 className="fs-16 mt-1 mb-0">My Shortlist</h1>
              <small>Manage your shortlist from here</small>
            </Card.Header>
            <Card.Body>
              <Form className="mb-3">
                <Form.Row>
                  <Col>
                    <Select size="large" style={{ width: "100%" }}
                      placeholder="Select type"
                      value={type_id.value}
                      onChange={e => searchChangeHandler(e, "type_id")}
                      allowClear
                    >
                      <Option value="">All</Option>
                      {type_list}
                    </Select>
                  </Col>
                  <Col>
                    <Select size="large" style={{ width: "100%" }}
                      placeholder="Select status or period"
                      onChange={e => searchChangeHandler(e, "status")}
                      value={status.value}
                      allowClear
                    >
                      <Option value="">All</Option>
                      {status_list}
                    </Select>
                  </Col>
                </Form.Row>
              </Form>
              {property && property.data.length > 0 ? (
                <ContainerCardProperty 
                  dataProperty={property} 
                  horizontal={false} 
                />
              ) : (
                <Container>
                  <Card className="text-muted mt-2 pt-5 pb-5 shadow-none border-0">
                    <Card.Img variant="top" src="/static/images/no-property.png" className="img-size mx-auto" />
                    <Card.Body>
                      <Card.Title className="text-center">
                        There is no shortlist
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Container>
              )}
              {property.iter_pages && property.iter_pages.length > 0 && property.iter_pages.length > 1 && (
                <Pagination className="justify-content-end mt-4">
                  <Pagination.Prev onClick={prevHandler} disabled={property.prev_num === null} />
                  {pagination}
                  <Pagination.Next onClick={nextHandler} disabled={property.next_num === null} />
                </Pagination>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      </Col>

      <style jsx>{`
        :global(.page-link){
          border-radius: 2px;
          margin-left: 5px;
          color: #021927;
        }
        :global(.page-item.active .page-link){
          background-color: #021927;
          border-color: #021927;
        }
        :global(.page-link:hover){
          color: #021927;
        }
        :global(.page-item.disabled .page-link){
          color: #9c9c9c;
        }
        :global(.page-link:focus){
          box-shadow: 0 0 0 0.2rem rgba(84, 84, 84, 0.25);
        }
        :global(.ant-select-selection-placeholder, .ant-input::placeholder){
          opacity: 0.4;
          font-size: 14px;
          color: black;
        }
        :global(.ant-select:not(.ant-select-disabled):hover .ant-select-selector){
          border-color: rgb(162, 162, 162);
          border-radius: 0.25rem;
        }
        :global(.ant-input:focus, .ant-input-focused, .ant-input:hover, 
                .ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector
        ){
          border: 1px solid rgb(162, 162, 162);
          border-radius: 0.25rem;
          box-shadow: none;
        }
        :global(.ant-select-single .ant-select-selector .ant-select-selection-search-input){
          width: 100%;
          border-radius: 0.25rem;
          padding: 7px 12px;
        }
        :global(.ant-select-single:not(.ant-select-customize-input) .ant-select-selector){
          border-radius: 0.25rem;
        }
      `}</style>
    </>
  );
};

export default Shortlist;
