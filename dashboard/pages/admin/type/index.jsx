import { useState } from "react";
import { withAuth } from "../../../hoc/withAuth"
import { useDispatch, useSelector } from "react-redux";
import { formType } from "../../../components/Type/formType";

import * as actions from "../../../store/actions";
import axios, {jsonHeaderHandler} from "../../../lib/axios";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import EditModal from "../../../components/Type/EditModal";
import TypeCard from "../../../components/Type/CardType";
import AddType from "../../../components/Type/AddType";

const TypeCardMemo = React.memo(TypeCard);

const Types = () => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [currentType, setCurrentType] = useState(formType);

  const dataType = useSelector((state) => state.types.types);

  const editTypeHandler = id => {
    axios.get(`/type/crud/${id}`, jsonHeaderHandler())
      .then(res => {
        const {id, name, icon} = res.data;
        const data = {
          id: id,
          name: { value: name, isValid: true, message: null },
          icon: { value: icon, isValid: true, message: null }
        }
        setCurrentType(data);
        setShowEdit(true);
      })
      .catch(err => {
        if (err.response && err.response.data) {
          const {message} = err.response.data;
          if(message){
            swal({ title: "Oops!", text: message, icon: "error", button: "Got it", dangerMode: true, });
          }
        }
      })
  }

  const deleteTypeHandler = id => {
    swal({
      title: "Are you sure?!",
      text: "This will also delete in all properties that use this type!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/type/crud/${id}`, jsonHeaderHandler())
          .then((res) => {
            dispatch(actions.getType())
            swal({ title: "Success", text: res.data.message, icon: "success", timer: 3000, });
          })
          .catch((err) => {
            if (err.response && err.response.data) {
              const {message} = err.response.data;
              if(message){
                swal({ title: "Oops!", text: message, icon: "error", button: "Got it", dangerMode: true, });
              }
            }
          });
      }
    })
  }

  return (
    <>
      <AddType />

      <Container fluid>
        <Row>
          {dataType && dataType.map(data => {
            const {id, name} = data;
            return(
              <Col xl={3} lg={4} md={4} sm={6} xs={12} key={id}>
                <TypeCardMemo
                  name={name}
                  edit={() => editTypeHandler(id)}
                  onDelete={() => deleteTypeHandler(id)}
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
          currentType={currentType}
        />
      )}
    </>
  );
};

Types.getInitialProps = async ctx => {
  let res = await axios.get('/types');
  ctx.store.dispatch(actions.getTypeSuccess(res.data)); 
}

export default withAuth(Types);
