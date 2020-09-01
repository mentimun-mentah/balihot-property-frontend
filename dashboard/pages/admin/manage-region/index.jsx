import { useSelector, useDispatch } from "react-redux";
import { withAuth } from "../../../hoc/withAuth"

import swal from "sweetalert";
import axios, { jsonHeaderHandler } from '../../../lib/axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as actions from "../../../store/actions";
import Container from "react-bootstrap/Container";
import CardEmpty from '../../../components/Card/CardEmpty'

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
          .delete(`/region/crud/${id}`, jsonHeaderHandler())
          .then((res) => {
            dispatch(actions.getRegion())
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

  return (
    <>
      <Container fluid>
        <Row>
          {dataRegion && dataRegion.length > 0 ?
            dataRegion.map(data => {
            const {id, slug, name, image} = data;
            return(
              <Col xl={3} lg={4} md={4} sm={6} xs={12} key={id} >
                <RegionCardMemo id={id} slug={slug}
                  name={name} image={image} 
                  onDelete={() => deleteRegionHandler(id)} 
                />
              </Col>
            )
            }) : (
              <Container>
                <CardEmpty 
                  cardClass="text-muted mt-4 pt-5 pb-5 shadow-none border-0"
                  img="/static/images/no-popular-place.png"
                  imgClass="img-size mx-auto"
                  titleClass="text-center text-black-50"
                  title="There is no region"
                />
              </Container>
            )}
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
