import { useState } from "react";
import { withAuth } from "../../../hoc/withAuth"
import { useDispatch, useSelector } from "react-redux";
import { formRegion } from "../../../components/Region/regionData";

import * as actions from "../../../store/actions";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios, {headerCfg} from "../../../lib/axios";
import AddRegion from "../../../components/Region/AddRegion";
import EditModal from "../../../components/Region/EditModal";
import RegionCard from "../../../components/Region/CardRegion";

const RegionCardMemo = React.memo(RegionCard);

const Region = () => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(formRegion);

  const dataRegion = useSelector((state) => state.region.region);

  const editRegionHandler = region => {
    axios.get(`/region/crud/${region.id}`, headerCfg)
      .then(res => {
        const {id, image, name} = res.data;
        const data = {
          id: id,
          image: { 
            value: [{
              uid: -Math.abs(id),
              url: `${process.env.API_URL}/static/regions/${image}`
            }], 
            isValid: true, 
            message: null 
          },
          name: { value: name, isValid: true, message: null }
        }
        setCurrentRegion(data);
        setShowEdit(true);
      })
      .catch(err => {
        if (err.response && err.response.data) {
          const {message} = err.response.data;
          if(message){
            swal({ title: message, text: "", icon: "error", button: "Got it", dangerMode: true, });
          }
        }
      })
  }

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
      <AddRegion />

      <Container fluid>
        <Row>
          {dataRegion && dataRegion.map(data => {
            const {id, name, image} = data;
            return(
              <Col xl={3} lg={4} md={4} sm={6} xs={12} key={id} >
                <RegionCardMemo id={id} 
                  name={name} image={image} 
                  edit={() => editRegionHandler(data)} 
                  onDelete={() => deleteRegionHandler(id)} 
                />
              </Col>
            )
          })}
        </Row>
      </Container>

      {showEdit && (
        <EditModal
          show={showEdit}
          close={() => setShowEdit(false)}
          currentRegion={currentRegion}
        />
      )}

    </>
  );
};

Region.getInitialProps = async ctx => {
  let res = await axios.get('/regions');
  ctx.store.dispatch(actions.getRegionSuccess(res.data)); 
}

export default withAuth(Region);
