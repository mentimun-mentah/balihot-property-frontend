import { useState, useCallback, useEffect } from "react";
import { Card, Col, Container, Tabs, Tab, Button, Jumbotron, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import Carousel from "react-multi-carousel";
import SearchBox from "./NewSearch";
import CardPlace from "../Card/CardPlace";
import CardTeams from "../Card/CardTeam";
import Workflow from "./Workflow";
import ContainerCardPropertyHome from "../Card/ContainerCardPropertyHome";
import * as actions from "../../store/actions";
import HomeStyle, {responsive, responsivePlace, ButtonGroupPlace} from "./style";
import CardsNewHorizontal from "../../components/Card/CardNewsHorizontalHome";

const Home = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Sale");

  useEffect(() => {
    dispatch(actions.getPropertyBy(true, "Sale", 3))
  },[])

  const region = useSelector(state => state.region.region)
  const team = useSelector(state => state.team.team)
  const property = useSelector(state => state.property.property)
  const newsletters = useSelector(state => state.newsletter.newsletter);
  const dataType = useSelector(state => state.types.types);
  const text = useSelector(state => state.auth.text);

  let VILLA_CHECK_ID = null;
  let LAND_CHECK_ID = null;

  for(let key in dataType){
    if(dataType[key].name.toLowerCase() === "villa"){
      VILLA_CHECK_ID = dataType[key].id
    }
    if(dataType[key].name.toLowerCase() === "land"){
      LAND_CHECK_ID = dataType[key].id
    }
  }

  const activeTabHandler = useCallback(e => {
    setActiveTab(e)
    let searchQuery = '';
    if(e === "Sale" || e === "Rent") searchQuery = `property_for=${e}`;
    if(e === "Land") searchQuery = `type_id=${LAND_CHECK_ID}`;
    dispatch(actions.getPropertyBy(true, searchQuery, 3))
  }, []);

  const searchHandler = () => {
    let q = '?'
    if(activeTab !== "Land") q = q + `property_for=${activeTab}`
    else q = q + `type_id=${LAND_CHECK_ID}`

    let check = q.slice(-1)
    if(check === "&") check = q.slice(0, -1)
    else check = q

    Router.push(`/all-properties${check}`)
  }

  const newsContent = (
    <>
      <h3 className="text-white fs-24-s">Our Newsletter</h3>
      {text && text.newsletter && (
        <p className="text-white mt-5 text-justify p-l-10-s p-r-10-s">{text.newsletter}</p>
      )}
      <Link href="/news" as="/news">
        <Button variant="outline-light" className="text-center rounded-0">Read More</Button>
      </Link>
    </>
  )

  return (
    <>
      <div id="home" />
      <div className="jumbotron mb-0 rounded-0">
        <div className="hero-text">
          <Container>
            <h1 className="text-center text-white fs-50-t fs-24-m fs-22-s">
              Discover the best properties in one place
            </h1>
            <p className="text-center fs-22 fs-18-s fs-20-m">
              Find and choose a location to start your new life in here
            </p>
          </Container>
          <SearchBox />
        </div>
      </div>
      <Container fluid>
        <section className="text-center pb-0">
          <h2 className="fs-24-m fs-24-s">Real Estate Properties</h2>
          <p className="text-muted fs-14-s">
            Are you looking for best property in bali ? list your property right
            now!
          </p>
        </section>
        <section>
          <Tabs
            defaultActiveKey={activeTab}
            className="justify-content-center border-0"
            onSelect={activeTabHandler}
          >
            <Tab eventKey="Sale" title={<strong>Sale</strong>}>
              {activeTab === "Sale" && (
                <>
                  <Container className="mt-4 px-0">
                    {property && property.data.length > 0 ? (
                      <>
                        <ContainerCardPropertyHome dataProperty={property} horizontal={false} />
                        <Button variant="outline-dark" className="mt-4" onClick={searchHandler}>
                          Show All &nbsp;<i className="fas fa-chevron-right"></i>
                        </Button>
                      </>
                    ) : (
                      <Container>
                        <Card className="text-muted mt-2 pt-5 pb-5">
                          <Card.Img variant="top" src="/static/images/no-property.png" className="img-size mx-auto" />
                          <Card.Body>
                            <Card.Title className="text-center">
                              There is no sale properties
                            </Card.Title>
                          </Card.Body>
                        </Card>
                      </Container>
                    )}
                  </Container>
                </>
              )}
            </Tab>
            <Tab eventKey="Rent" title={<strong>Rent</strong>}>
              {activeTab === "Rent" && (
                <>
                  <Container className="mt-4 px-0">
                    {property && property.data.length > 0 ? (
                      <>
                        <ContainerCardPropertyHome dataProperty={property} horizontal={false} />
                        <Button variant="outline-dark" className="mt-4" onClick={searchHandler}>
                          Show All &nbsp;<i className="fas fa-chevron-right"></i>
                        </Button>
                      </>
                    ) : (
                      <Container>
                        <Card className="text-muted mt-2 pt-5 pb-5">
                          <Card.Img variant="top" src="/static/images/no-property.png" className="img-size mx-auto" />
                          <Card.Body>
                            <Card.Title className="text-center">
                              There is no rent properties
                            </Card.Title>
                          </Card.Body>
                        </Card>
                      </Container>
                    )}
                  </Container>
                </>
              )}
            </Tab>
            <Tab eventKey="Land" title={<strong>Land</strong>}>
              {activeTab === "Land" && (
                <>
                  <Container className="mt-4 px-0">
                    {property && property.data.length > 0 ? (
                      <>
                        <ContainerCardPropertyHome dataProperty={property} horizontal={false} />
                        <Button variant="outline-dark" className="mt-4" onClick={searchHandler}>
                          Show All &nbsp;<i className="fas fa-chevron-right"></i>
                        </Button>
                      </>
                    ) : (
                      <Container>
                        <Card className="text-muted mt-2 pt-5 pb-5">
                          <Card.Img variant="top" src="/static/images/no-property.png" className="img-size mx-auto" />
                          <Card.Body>
                            <Card.Title className="text-center">
                              There is no land properties
                            </Card.Title>
                          </Card.Body>
                        </Card>
                      </Container>
                    )}
                  </Container>
                </>
              )}
            </Tab>
          </Tabs>
          <div id="about-us"></div>
        </section>
      </Container>

      <section className="discover-propt">
        <div className="overlay-bg"></div>
        <Container>
          <div className="discover-text">
            <h3 className="fs-24-s">Discover a property where love to stay</h3>
            {text && text.discover && (
              <p className="fs-14-s">{text.discover}</p>
            )}
          </div>
        </Container>
      </section>

      <Container fluid>
        <section className="text-center pb-0">
          <p className="text-muted mb-0 fs-14-s">Popular Places</p>
          <h2 className="fs-24-s">Find Perfect Place</h2>
        </section>
        {region && region.length > 0 ? (
          <section>
            <Container className="px-0 d-block d-sm-block d-md-none">
              <Carousel 
                infinite 
                ssr={true} 
                arrows={false}
                partialVisible={true}
                responsive={responsivePlace} 
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroupPlace />} 
              >
                {region && region.map(data => (
                  <Col key={data.id} className="pl-0">
                    <CardPlace 
                      id={data.id} 
                      slug={data.slug}
                      name={data.name} 
                      image={data.image} 
                      listing={data.listing} 
                    />
                  </Col>
                ))}
              </Carousel>
            </Container>
            <Container className="px-0 d-none d-sm-none d-md-block">
              <Carousel 
                infinite 
                ssr={true} 
                centerMode
                arrows={false}
                responsive={responsivePlace} 
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroupPlace />} 
              >
                {region && region.map(data => (
                  <Col key={data.id} className="pl-0">
                    <CardPlace 
                      id={data.id} 
                      slug={data.slug}
                      name={data.name} 
                      image={data.image} 
                      listing={data.listing}
                    />
                  </Col>
                ))}
              </Carousel>
            </Container>
            <div id="contact-us" />
          </section>
        ) : (
          <Container>
            <Card className="text-muted mt-4 pt-5 pb-5">
              <Card.Img
                variant="top"
                src="/static/images/no-popular-place.png"
                className="img-size mx-auto"
              />
              <Card.Body>
                <Card.Title className="text-center">
                  There is no popular place
                </Card.Title>
              </Card.Body>
            </Card>
          </Container>
        )}
      </Container>

      <section className="discover-news mt-5">
        <div className="overlay-bg-news"></div>
        <Container>
          {newsletters && newsletters.data && newsletters.data.length > 0 ? (
            <Row>
              <Col md={12} lg={4} xl={4}>{newsContent}</Col>
              <Col md={12} lg={7} xl={7} md={{ offset: 1 }} 
                className="d-none d-sm-none d-md-none d-lg-block d-xl-block mt-5-s mt-5-tablets ml-0-tablets"
              >
               <Row>
                 {newsletters && newsletters.data && newsletters.data.length > 0 &&
                  newsletters.data.slice(0,2).map((data, x) => {
                 const { id, slug, title, thumbnail, description, created_at } = data;
                 return(
                   <Col md={12} lg={12} xl={12} key={id}>
                     <CardsNewHorizontal 
                       order={x}
                       slug={slug}
                       title={title}
                       description={description}
                       thumbnail={thumbnail}
                       created_at={created_at}
                     />
                   </Col>
                 )})}
               </Row>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col xl={8} className="text-center">{newsContent}</Col>
            </Row>
          )} 
        </Container>
      </section>

      <Container fluid>
        <section className="text-center pb-0">
          <p className="text-muted mb-0 fs-14-s">Perfect Team</p>
          <h2 className="fs-24-s">Meet Our People</h2>
        </section>
        <section>
          {team && team.length > 0 ? (
            <Container className="px-0">
              <Carousel 
                infinite 
                centerMode
                ssr={true} 
                responsive={responsive} 
              >
                {team && team.map(team => (
                  <Col key={team.id} className="pl-0">
                    <CardTeams name={team.name} image={team.image} title={team.title} phone={team.phone} />
                  </Col>
                ))}
              </Carousel>
            </Container>
          ) : (
            <Container>
              <Card className="text-muted mt-4 pt-5 pb-5">
                <Card.Img
                  variant="top"
                  src="/static/images/no-team.png"
                  className="img-size mx-auto"
                />
                <Card.Body>
                  <Card.Title className="text-center">
                    There is no team
                  </Card.Title>
                </Card.Body>
              </Card>
            </Container>
          )}
        </section>
      </Container>

      <Container fluid>
        <section className="text-center pb-0">
          <p className="text-muted mb-0 fs-14-s">See How We Operate</p>
          <h2 className="fs-24-s">What You Need To Do</h2>
        </section>
        <Workflow />
      </Container>

      <Jumbotron fluid className="mb-0" style={{ backgroundColor: "#021927" }}>
        <Container className="text-center text-white">
          <h3 className="text-white fs-16-s">Discover a property where love to stay</h3>
          <Link href="/all-properties" as="/all-properties">
            <Button variant="outline-light rounded-pill" className="mt-2">
              Let's get started!
            </Button>
          </Link>
        </Container>
      </Jumbotron>

      <style jsx>{`
        /*### JUMBOTRON ###*/
        .jumbotron {
          /*margin-top: 4rem;*/
          background-image: url("/static/images/bg-image.png");
          height: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          height: 85vh;
        }
        .jumbotron:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #021927;
          opacity: 0.7;
        }
        .hero-text {
          position: absolute;
          width: 100%;
          padding: 0 15px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
        }
        /*### JUMBOTRON ###*/

        /*### REAL ESTATE ###*/
        :global(.nav-tabs > a.active) {
          color: black !important;
          border-bottom: 2px solid #32465b !important;
        }
        :global(.nav-tabs .nav-link) {
          color: #551a8b;
          border: 0px;
        }
        :global(.nav-tabs > .nav-link:focus) {
          outline-color: white;
        }
        /*### REAL ESTATE ###*/

        /*### DISCOVER PROPERTY ###*/
        .overlay-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #021927;
          opacity: 0.9;
        }
        .discover-propt {
          background-image: url("/static/images/discov-bg.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          padding: 80px 0 80px 0;
        }
        .discover-text {
          width: 90%;
          margin: 0 auto;
          text-align: center;
          position: relative;
        }
        .discover-text > h3 {
          color: #ffffff;
          font-size: 32px;
          font-weight: 500;
          margin-bottom: 18px;
        }
        .discover-text > p {
          font-size: 16px;
          line-height: 30px;
          margin-bottom: 25px;
          color: #fff;
        }
        @media (max-width: 768px) {
          .discover-text {
            width: 100%;
          }
        }
        /*### DISCOVER PROPERTY ###*/

        /*### CARAUSEL ###*/
        :global(.react-multiple-carousel__arrow--left) {
          left: 0;
          top: 0;
          bottom: 0;
          width: 60px;
          border-radius: 0px;
        }
        :global(.react-multiple-carousel__arrow--right) {
          right: 0;
          top: 0;
          bottom: 0;
          width: 60px;
          border-radius: 0px;
        }
        :global(.react-multiple-carousel__arrow::before) {
          font-size: 25px;
        }
        /*### CARAUSEL ###*/

        @media (max-width: 575.98px) { 
          :global(.react-multiple-carousel__arrow--right) {
            width: 10px;
          }
          :global(.react-multiple-carousel__arrow--left) {
            width: 10px;
          }
        }
        /*### EMPTY CARD ###*/
        :global(.img-size) {
          width: auto;
          height: 100px;
          opacity: 0.5;
        }

        /*### DISCOVER NEWS ###*/
        .overlay-bg-news {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.9;
          background-color: #021927;
        }
        .discover-news {
          background-image: url("/static/images/bg-home-news.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          padding: 80px 0 80px 0;
        }
        /*### DISCOVER NEWS ###*/

        // Small devices (landscape phones, less than 768px)
        @media (max-width: 767.98px) { 
          :global(.mt-5-s) {
            margin-top: 3rem!important;
          }
        }
        // Medium devices (tablets, less than 992px)
        @media (max-width: 991.98px) { 
          :global(.mt-5-tablets) {
            margin-top: 5rem!important;
          }
          :global(.ml-0-tablets) {
            margin-left: 0!important;
          }
        }
        :global(.btn-outline-bhp) {
            color: #021927;
            background-color: #fff;
            border-color: #021927;
        }
        :global(.btn-outline-bhp:hover) {
            color: #fff;
            background-color: #021927;
            border-color: #021927;
        }
        :global(.btn-outline-bhp:active) {
            color: #fff !important;
            background-color: #021927 !important;
            border-color: #021927 !important;
        }
        :global(.btn-outline-bhp:focus) {
            color: #fff;
            background-color: #021927;
            border-color: #021927;
        }
      `}</style>
      <style jsx>{HomeStyle}</style>
    </>
  );
};

export default Home;
