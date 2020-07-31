import { useState } from "react";
import { withAuth } from "../../../hoc/withAuth"
import { useDispatch, useSelector } from "react-redux";
import { formTeam } from "../../../components/Teams/formTeams";
import { Container, Row, Col } from "react-bootstrap";

import swal from "sweetalert";
import * as actions from "../../../store/actions";
import axios, {headerCfg} from "../../../lib/axios";

import AddTeams from "../../../components/Teams/AddTeams";
import EditModal from "../../../components/Teams/EditModal";
import TeamCard from "../../../components/Teams/CardTeams";

const TeamCardMemo = React.memo(TeamCard);

const Teams = () => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(formTeam);
  const dataTeam = useSelector((state) => state.team.team);

  const editTeamHandler = id => {
    axios.get(`/team/crud/${id}`, headerCfg)
      .then(res => {
        const {id, image, name, title, phone} = res.data;
        const data = {
          id: id,
          image: { 
            value: [{
              uid: -Math.abs(id),
              url: `${process.env.API_URL}/static/teams/${image}`
            }], 
            isValid: true, 
            message: null 
          },
          name: { value: name, isValid: true, message: null },
          title: { value: title, isValid: true, message: null },
          phone: { value: phone, isValid: true, message: null },
        }
        setCurrentTeam(data)
        setShowEdit(true);
      })
      .catch(err => {
        if (err.response && err.response.data) {
          const {message} = err.response.data;
          swal({ title: "Upps!", text: message, icon: "error", timer: 3000, });
        }
      })
  }

  const deleteTeamHandler = id => {
    swal({
      title: "Warning!",
      text: "Are you sure wan't to delete this?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/team/crud/${id}`, headerCfg)
          .then((res) => {
            dispatch(actions.getTeam())
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
      <AddTeams />

      <Container fluid>
        <Row>
          {dataTeam && dataTeam.map(data => {
            const {id, name, image, title, phone} = data;
            return(
              <Col xl={3} lg={4} md={4} sm={6} xs={12} key={id} >
                <TeamCardMemo id={id} 
                  name={name} image={image} 
                  phone={phone} title={title}
                  edit={() => editTeamHandler(id)} 
                  onDelete={() => deleteTeamHandler(id)} 
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
          currentTeam={currentTeam}
        />
      )}

    </>
  );
};

Teams.getInitialProps = async ctx => {
  let res = await axios.get('/teams');
  ctx.store.dispatch(actions.getTeamSuccess(res.data)); 
}

export default withAuth(Teams);
