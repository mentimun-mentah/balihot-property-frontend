import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'
import ContainerCardProperty from "../Card/ContainerCardProperty";

import { useSelector } from "react-redux";
import { Select, Input, AutoComplete } from 'antd';
import { motion } from "framer-motion";
import { Fade } from "../Transition";
import { renderOptions } from "../../lib/renderOptions";

const { Option } = Select;

const Shortlist = () => {
  const property = useSelector(state => state.property.property)
  const dataType = useSelector((state) => state.types.types);

  const type_list = []; renderOptions(type_list, dataType, true);

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
                    >
                      {type_list}
                    </Select>
                  </Col>
                  <Col>
                    <Select size="large" style={{ width: "100%" }}
                      placeholder="Select status"
                    >
                      <Option value="jack">Free Hold</Option>
                      <Option value="lucy">Lease Hold</Option>
                    </Select>
                  </Col>
                </Form.Row>
              </Form>
              <ContainerCardProperty 
                dataProperty={property} 
                horizontal={false} 
              />
              <Pagination className="justify-content-end mt-4">
                <Pagination.Prev />
                <Pagination.Next />
              </Pagination>
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
