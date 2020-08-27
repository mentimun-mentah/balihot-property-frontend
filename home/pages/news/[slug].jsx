import { Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import NoSSR from "react-no-ssr";
import axios from "../../lib/axios";
import parse from "html-react-parser";
import Container from "react-bootstrap/Container";
import * as actions from "../../store/actions";
import ShareModal from "../../components/Card/ShareModal";

const ShareModalMemo = React.memo(ShareModal);
const DetailNewsletter = () => {
  const newsletter = useSelector(state => state.newsletter.slug);

  const [showModal, setShowModal] = useState(false);
  const shareLink = `${process.env.BASE_URL}/news/${newsletter.slug}`;

  console.error = (function(_error) {
    return function(message) {
      if (
        typeof message !== "string" ||
        message.indexOf("component is `contentEditable`") === -1
      ) {
        _error.apply(console, arguments);
      }
    };
  })(console.error);

  return(
    <>
      <header>
        <div className="full-width-image">
          <img
            src={`${process.env.API_URL}/static/newsletters/${newsletter.slug}/${newsletter.image}`}
            height="400"
            alt={newsletter.title}
          />
        </div>
      </header>

      <Container className="mt-6 mb-5">
        <h1 className="text-capitalize fs-24-s fs-26-m fs-40-t">{newsletter.title}</h1>
        <div className="news-information font-weight-lighter fs-14 mt-3">
          <span className="mr-1">
            <NoSSR>
              {moment(newsletter.created_at).format("DD MMMM YYYY")}
            </NoSSR>
          </span> 
          {" "}&#8226;{" "}
          <span className="mx-1">{newsletter.seen} views</span>
          {" "}&#8226;{" "}
          <span className="share-news ml-1" onClick={() => setShowModal(true)}>
            <a><i className="fal fa-share-square" /><span className="ml-1">Share</span></a>
          </span>
        </div>
        <hr className="mt-4 mb-4" />
        {parse(newsletter.description)}
      </Container>

      <Modal
        centered
        footer={null}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        title="Share"
        closeIcon={<i className="fas fa-times" />}
        bodyStyle={{ padding: "10px 0px" }}
        width="400px"
      >
        <ShareModalMemo link={shareLink} />
      </Modal>


      <style jsx>{`
        :global(.mt-6) {
          margin-top: 6rem !important;
        }

        .full-width-image {
          width: 100vw;
          position: relative;
          left: 50%;
          margin-left: -50vw;
          top: 4rem;
          bottom: 4rem;
        }

        .full-width-image img {
          width: 100%;
          object-fit: cover;
        }

        :global(.txt-space-pre-line) {
          white-space: pre-line;
        }
        
        :global(.share-news:hover){
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

DetailNewsletter.getInitialProps = async ctx => {
  const { slug } = ctx.query;
  try {
    const res = await axios.get(`/newsletter/${slug}`);
    ctx.store.dispatch(actions.slugNewsletterSuccess(res.data));
    await ctx.store.dispatch(actions.authCheckState(ctx))
  } catch (err) {
    if(err.response.status == 404){
      process.browser
        ? Router.replace("/news", "/news") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/news" }).end(); //Redirec from Server Side
    }
  }
};

export default DetailNewsletter
