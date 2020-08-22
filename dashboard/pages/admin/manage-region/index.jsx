import { useSelector, useDispatch } from "react-redux";
import { withAuth } from "../../../hoc/withAuth"
import { pagination_iter } from "../../../lib/paginationIter.js"

import swal from "sweetalert";
import axios, { headerCfg } from '../../../lib/axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from 'react-bootstrap/Pagination'
import * as actions from "../../../store/actions";
import Container from "react-bootstrap/Container";

import RegionCard from "../../../components/Region/CardRegion";
const RegionCardMemo = React.memo(RegionCard);

const ManageRegion = () => {
  const dispatch = useDispatch();
  const dataRegion = useSelector((state) => state.region.region);

  const deleteRegionHandler = id => {
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
          .delete(`/region/crud/${id}`, headerCfg)
          .then((res) => {
            dispatch(actions.getRegion())
            swal({ title: "Success", text: res.data.message, icon: "success", timer: 3000, });
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
          {dataRegion && dataRegion.map(data => {
            const {id, name, image} = data;
            return(
              <Col xl={3} lg={4} md={4} sm={6} xs={12} key={id} >
                <RegionCardMemo id={id} 
                  name={name} image={image} 
                  onDelete={() => deleteRegionHandler(id)} 
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  );
};

ManageRegion.getInitialProps = async ctx => {
  let res = await axios.get('/regions');
  ctx.store.dispatch(actions.getRegionSuccess(res.data)); 
}

export default withAuth(ManageRegion);
