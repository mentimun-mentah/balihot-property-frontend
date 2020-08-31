import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withAuth } from "../../../hoc/withAuth";
import { pagination_iter } from "../../../lib/paginationIter.js"
import { Input, AutoComplete } from 'antd';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import swal from "sweetalert";
import * as actions from "../../../store/actions";
import axios, { jsonHeaderHandler } from '../../../lib/axios';
import Pagination from 'react-bootstrap/Pagination'
import CardEmpty from '../../../components/Card/CardEmpty';
import CardNews from "../../../components/Card/CardNews";
const CardNewsMemo = React.memo(CardNews);

const ManageNews = () => {
  const dispatch = useDispatch();
  const dataNewsletter = useSelector(state => state.newsletter.newsletter);
  const listTitle = useSelector(state => state.newsletter.title);

  const [search, setSearch] = useState('')
  const [active, setActive] = useState(dataNewsletter.page)

  const searchChangeHandler = e => {
    setSearch(e)
    setActive(1)
  }

  let isSearching = search.replace(/^\s+/, '').replace(/\s+$/, '').length !== 0

  useEffect(() => {
    let q = '?'
    if(search) q += `q=${search.charAt(0).toUpperCase() + search.slice(1)}&`
    if(active) q += `page=${active}&per_page=8`
    if(isSearching){
      dispatch(actions.getTitle(q))
      dispatch(actions.getNewsletter(q))
    }else{
      dispatch(actions.getNewsletter(q))
    }
  },[search, active])

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
          .delete(`/newsletter/crud/${id}`, jsonHeaderHandler())
          .then((res) => {
            dispatch(actions.getNewsletter(''))
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

  //====== PAGINATION ======//
  const pageHandler = (event) => {
    setActive(+event.target.text);
  };
  const prevHandler = () => {
    setActive(dataNewsletter.prev_num);
  };
  const nextHandler = () => {
    setActive(dataNewsletter.next_num);
  };
  let pagination = []; let iter_data;
  if(dataNewsletter.iter_pages && dataNewsletter.iter_pages.length > 0){
    iter_data = dataNewsletter.iter_pages.slice(-1)[0]
  } 
  for(let n of pagination_iter(dataNewsletter.page, iter_data)){
    let click = pageHandler;
    if (n === +active) click = null;
    if(n === "..."){
      pagination.push(
        <Pagination.Ellipsis key={n + Math.random} disabled />
      )
    } else {
      pagination.push(
        <Pagination.Item key={n + Math.random} active={n === +active} text={n} onClick={click}>
          {n}
        </Pagination.Item>,
      );
    }
  }
  //====== PAGINATION ======//

  return (
    <>
      <Container fluid>
        <Row className="mt--2 mt-lg--4 mb-4 justify-content-end">
          <Col className="col-md-auto col-lg-auto col-xl-auto col-sm-12 col-12 align-self-center">
            <AutoComplete
              className="w-100 search-news"
              options={listTitle}
              filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              onChange={searchChangeHandler}
              value={search}
            >
              <Input.Search placeholder="Search news title" enterButton />
            </AutoComplete>
          </Col>
        </Row>

        <Row>
          {dataNewsletter && dataNewsletter.data && dataNewsletter.data.length > 0 ?
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
          }) : (
            <Container>
              <CardEmpty 
                cardClass="text-muted mt-4 pt-5 pb-5 shadow-none border-0"
                img="/static/images/no-newsletter.png"
                imgClass="img-size mx-auto"
                titleClass="text-center text-black-50"
                title="There is no newsletter"
              />
            </Container>
          )}

          {dataNewsletter.iter_pages && dataNewsletter.iter_pages.length > 0 && dataNewsletter.iter_pages.length > 1 && (
            <Col className="col-12 mt-3 mb-5">
              <Pagination className="justify-content-center">
                <Pagination.Prev onClick={prevHandler} disabled={dataNewsletter.prev_num === null} />
                  {pagination}
                <Pagination.Next onClick={nextHandler} disabled={dataNewsletter.next_num === null} />
              </Pagination>
            </Col>
          )}
        </Row>
      </Container>
      <style jsx>{`
        @media (min-width: 768px) {
          :global(.search-news .ant-input-search) {
            width: 300px !important;
          }
        }
        :global(.search-news .ant-btn-primary){
          background: #ff385c;
          border-color: #ff385c;
        }
        :global(.search-news .ant-input-search-enter-button input:hover, 
                .search-news .ant-input-search-enter-button input:focus){
          border-color: #d9d9d9;
        }
        :global(.search-news .ant-input:focus, .search-news .ant-input-focused){
          box-shadow: unset;
        }
      `}</style>
    </>
  );
};

ManageNews.getInitialProps = async ctx => {
  let res = await axios.get("/newsletters?per_page=8");
  ctx.store.dispatch(actions.getNewsletterSuccess(res.data));
};

export default withAuth(ManageNews);
