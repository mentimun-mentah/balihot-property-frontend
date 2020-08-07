import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
import ContainerCardProperty from "../Card/ContainerCardProperty";
import * as actions from "../../store/actions";

import { useDispatch, useSelector } from "react-redux";
import { Select } from 'antd';
import { motion } from "framer-motion";
import { Fade } from "../Transition";
import { renderOptions } from "../../lib/renderOptions";

const { Option } = Select;

const formFilter = {
  type_id: { value: [] },
  status: { value: [] },
}

const Shortlist = () => {
  const dispatch = useDispatch()

  const property = useSelector(state => state.property.property)
  const dataType = useSelector((state) => state.types.types);

  const [filter, setFilter] = useState(formFilter)
  const [active, setActive] = useState(property.page);

  const type_list = []; renderOptions(type_list, dataType, true);

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

  const resetFilterHandler = () => {
    setFilter(formFilter);
  }

  const { type_id, status } = filter;

  useEffect(() => {
    let query = ''
    if(type_id.value !== "" && status.value !== "") {
      query = `type_id=${type_id.value}&status=${status.value}&page=${active}` 
    }
    if(type_id.value !== "" && status.value == "") query = `type_id=${type_id.value}&page=${active}`
    if(type_id.value == "" && status.value !== "") query = `status=${status.value}&page=${active}`
    dispatch(actions.getWishlist(query))
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
  let pagination = [];
  let iter_data;
  if(property.iter_pages && property.iter_pages.length > 0) iter_data = property.iter_pages.length
  if(property.length === 0) iter_data = property.length
  for (let n = 1; n <= iter_data ; n++) {
    let click = pageHandler;
    if (n === +active) {
      click = null;
    }
    pagination.push(
      <Pagination.Item key={n} active={n === +active} text={+n} onClick={click}>
        {n}
      </Pagination.Item>
    );
  }
  //====== PAGINATION ======//
  
  return (
    <>
      <Col md={9} lg={10} className="ml-sm-auto pl-0">
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
                    >
                      {type_list}
                    </Select>
                  </Col>
                  <Col>
                    <Select size="large" style={{ width: "100%" }}
                      placeholder="Select status"
                      onChange={e => searchChangeHandler(e, "status")}
                      value={status.value}

                    >
                      <Option value="Free Hold">Free Hold</Option>
                      <Option value="Lease Hold">Lease Hold</Option>
                    </Select>
                  </Col>
                  <Col className="col-auto">
                    <Button variant="link" className="text-reset fs-14" onClick={resetFilterHandler}>Clear</Button>
                  </Col>
                </Form.Row>
              </Form>
              <ContainerCardProperty 
                dataProperty={property} 
                horizontal={false} 
              />
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
          height: 38px !important;
          padding: 8px 11px;
          border-radius: 0.25rem;
        }
      `}</style>
    </>
  );
};

export default Shortlist;
