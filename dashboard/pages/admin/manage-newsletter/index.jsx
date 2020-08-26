import { useSelector, useDispatch } from "react-redux";
import { withAuth } from "../../../hoc/withAuth";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import swal from "sweetalert";
import * as actions from "../../../store/actions";
import axios, { headerCfg } from '../../../lib/axios';
import CardNews from "../../../components/Card/CardNews";
const CardNewsMemo = React.memo(CardNews);

const ManageNews = () => {
  const dispatch = useDispatch();
  const dataNewsletter = useSelector(state => state.newsletter.newsletter);

  const deleteNewsletterHandler = id => {
    swal({
      title: "Are you sure?!",
      text: "This newsletter cannot be recover!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/newsletter/crud/${id}`, headerCfg)
          .then((res) => {
            dispatch(actions.getNewsletter())
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
          {dataNewsletter && dataNewsletter.data &&
            dataNewsletter.data.map(data => {
              const { id, slug, title, description, thumbnail } = data;
              return (
                <Col xl={3} lg={4} md={4} sm={6} xs={12} key={id}>
                  <CardNewsMemo
                    id={id}
                    slug={slug}
                    title={title}
                    description={description}
                    thumbnail={thumbnail}
                    onDelete={() => deleteNewsletterHandler(id)}
                  />
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

ManageNews.getInitialProps = async ctx => {
  let res = await axios.get("/newsletters");
  ctx.store.dispatch(actions.getNewsletterSuccess(res.data));
};

export default withAuth(ManageNews);
