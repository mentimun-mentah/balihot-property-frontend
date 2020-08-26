import { useState, useEffect } from "react";
import { Input, AutoComplete } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { pagination_iter } from "../../lib/paginationIter";

import Pagination from 'react-bootstrap/Pagination'
import Container from "react-bootstrap/Container"
import Jumbotron from "react-bootstrap/Jumbotron"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import axios from "../../lib/axios";
import * as actions from "../../store/actions";
import CardNews from "../../components/Card/CardNews"
import CardNewsHorizontal from "../../components/Card/CardNewsHorizontal"
import CardNewsHorizontalSmall from "../../components/Card/CardNewsHorizontalSmall"

const Newsletter = () => {
  const dispatch = useDispatch();
  const newsletters = useSelector(state => state.newsletter.newsletter);
  const popular = useSelector(state => state.newsletter.popular);
  const oldnews = useSelector(state => state.newsletter.oldnews);
  const listTitle = useSelector(state => state.newsletter.title);

  const [search, setSearch] = useState('')
  const [active, setActive] = useState(newsletters.page)

  const searchChangeHandler = e => {
    setSearch(e)
  }

  let isSearching = search.replace(/^\s+/, '').replace(/\s+$/, '').length !== 0

  useEffect(() => {
    let q = '?'
    if(search) q += `q=${search}&`
    if(active) q += `page=${active}&per_page=1`
    if(isSearching){
      console.log(q)
      setActive(newsletters.page)
      dispatch(actions.getTitle(q))
      dispatch(actions.getNewsletter(q))
    }else{
      dispatch(actions.getNewsletter(q))
    }
  },[search, active])

  //====== PAGINATION ======//
  const pageHandler = (event) => {
    setActive(+event.target.text);
  };
  const prevHandler = () => {
    setActive(newsletters.prev_num);
  };
  const nextHandler = () => {
    setActive(newsletters.next_num);
  };
  let pagination = []; let iter_data;
  if(newsletters.iter_pages && newsletters.iter_pages.length > 0) iter_data = newsletters.iter_pages.slice(-1)[0]
  for(let n of pagination_iter(newsletters.page, iter_data)){
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

  return(
    <>
      <Jumbotron fluid className="mt-4rem img-news">
        <Container>
          <h1 className="text-white font-weight-bold">Property Market News</h1>
          <p className="text-white">
            The latest news property in Bali.
          </p>
        </Container>
      </Jumbotron>

      <Container>
        <h3 className="mt-2">Old News</h3>
        <hr/>
        <Row>
          {oldnews && oldnews.data && oldnews.data.slice(0,3).map(data => {
            const { id, slug, title, thumbnail, description, created_at } = data;
            return(
              <Col md={6} lg={4} xl={4} key={id}>
                <CardNews 
                  slug={slug}
                  title={title}
                  description={description}
                  thumbnail={thumbnail}
                  created_at={created_at}
                />
              </Col>
            )
          })}
        </Row>
      </Container>

      <Container className="mt-5">
        <Row>
          <Col xl={8} className="order-12 order-md-12 order-lg-12 order-xl-1">
            <Row className="mt-2">
              {newsletters && newsletters.data && newsletters.data.map(data => {
                const { id, slug, title, thumbnail, description, created_at } = data;
                return(
                  <Col md={6} lg={12} xl={12} key={id} className="pl-2">
                    <CardNewsHorizontal 
                      slug={slug}
                      title={title}
                      description={description}
                      thumbnail={thumbnail}
                      created_at={created_at}
                    />
                  </Col>
                )
              })}
            </Row>

            <Row className="mt-5">
              {newsletters.iter_pages && newsletters.iter_pages.length > 0 && newsletters.iter_pages.length > 1 && (
                <Col className="col-12">
                  <Pagination className="justify-content-center">
                    <Pagination.Prev onClick={prevHandler} disabled={newsletters.prev_num === null} />
                      {pagination}
                    <Pagination.Next onClick={nextHandler} disabled={newsletters.next_num === null} />
                  </Pagination>
                </Col>
              )}
            </Row>
          </Col>
          <Col xl={4} className="order-md-1 order-lg-1 order-xl-1 mb-4 mt-2">
            <AutoComplete
              className="w-100 search-news m-b-18-s"
              options={listTitle}
              filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              onChange={searchChangeHandler}
              value={search}
            >
            <Input.Search placeholder="Search news" enterButton />
            </AutoComplete>
            <div className="hr-news mb-2 mt-4"></div>
            <h5 className="text-uppercase">Most Popular</h5>
            <ul className="list-unstyled mt-4">
              {popular && popular.map(data => {
                const { id, slug, title, thumbnail, created_at } = data;
                return(
                  <CardNewsHorizontalSmall 
                    key={id}
                    slug={slug}
                    title={title}
                    thumbnail={thumbnail}
                    created_at={created_at}
                  />
                )
              })}
            </ul>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        :global(.img-news) {
          background-image: url("https://images.unsplash.com/photo-1473755504818-b72b6dfdc226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")
        }
        :global(.img-news-horizontal){
          height: 100%;
          object-fit: cover;
        }
        :global(.hr-news){
          width: 50px;
          border-top: 3px solid rgba(252, 56, 74, 1);
        }
        :global(.mt-4rem){
          margin-top: 4rem !important;
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
        :global(.page-link){
          border-radius: 2px;
          margin-left: 5px;
          color: #021927;
        }
        :global(.page-item.active .page-link){
          background-color: #021927;
          border-color: #021927;
          color: white !important;
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
      `}</style>
    </>
  )
}

Newsletter.getInitialProps = async ctx => {
  const res = await axios.get(`/newsletters`);
  ctx.store.dispatch(actions.getNewsletterSuccess(res.data)); 
  const old = await axios.get(`/newsletters?order_by=asc`);
  ctx.store.dispatch(actions.oldNewsletterSuccess(old.data)); 
  const pop = await axios.get(`/newsletter/most-popular`);
  ctx.store.dispatch(actions.popularNewsletterSuccess(pop.data)); 
}

export default Newsletter
