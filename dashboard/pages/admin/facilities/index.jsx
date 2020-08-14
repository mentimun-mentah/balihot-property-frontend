import { useState } from "react";
import { withAuth } from "../../../hoc/withAuth"
import { useDispatch, useSelector } from "react-redux";
import { formFacility } from "../../../components/Facilities/facilityData";

import * as actions from "../../../store/actions";
import axios, {headerCfg} from "../../../lib/axios";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InfoModal from "../../../components/Facilities/InfoModal";
import EditModal from "../../../components/Facilities/EditModal";
import FacilityCard from "../../../components/Facilities/CardFacility";
import AddFacility from "../../../components/Facilities/AddFacility";

const FacilityCardMemo = React.memo(FacilityCard);
const InfoModalMemo = React.memo(InfoModal);

const Facilities = () => {
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentFacility, setCurrentFacility] = useState(formFacility);

  const dataFacility = useSelector((state) => state.facility.facility);
  const showInfoHandler = () => setShowInfo(!showInfo);

  const editFacilityHandler = id => {
    axios.get(`/facility/crud/${id}`, headerCfg)
      .then(res => {
        const {id, name, icon} = res.data;
        const data = {
          id: id,
          name: { value: name, isValid: true, message: null },
          icon: { value: icon, isValid: true, message: null }
        }
        setCurrentFacility(data);
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

  const deleteFacilityHandler = id => {
    swal({
      title: "Are you sure?!",
      text: "This will also delete in all properties that use this facility!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/facility/crud/${id}`, headerCfg)
          .then((res) => {
            dispatch(actions.getFacility())
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
      <AddFacility />

      <Container fluid>
        <Row>
          {dataFacility && dataFacility.map(data => {
            const {id, name, icon} = data;
            return(
              <Col xl={3} lg={4} md={4} sm={6} xs={12} key={id}>
                <FacilityCardMemo 
                  name={name}
                  icon={icon}
                  edit={() => editFacilityHandler(id)}
                  onDelete={() => deleteFacilityHandler(id)}
                />
              </Col>
            )
          })}
        </Row>
      </Container>

      {showInfo && (
        <InfoModalMemo show={showInfo} close={showInfoHandler} />
      )}

      {showEdit && (
        <EditModal
          show={showEdit}
          close={() => setShowEdit(false)}
          currentFacility={currentFacility}
        />
      )}
    </>
  );
};

Facilities.getInitialProps = async ctx => {
  let res = await axios.get('/facilities');
  ctx.store.dispatch(actions.getFacilitySuccess(res.data)); 
}

export default withAuth(Facilities);
