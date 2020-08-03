import { useState, useCallback } from "react";
import { Card, Col, Container, Tabs, Tab, Button, Jumbotron } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import Carousel from "react-multi-carousel";
import SearchBox from "./NewSearch";
import CardPlace from "../Card/CardPlace";
import CardTeams from "../Card/CardTeam";
import Workflow from "./Workflow";
import ContainerCardProperty from "../Card/ContainerCardProperty";
import HomeStyle, {responsive, responsivePlace, ButtonGroupPlace} from "./style";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Sale");

  const activeTabHandler = useCallback(e => setActiveTab(e), []);

  const region = useSelector(state => state.region.region)
  const team = useSelector(state => state.team.team)
  const saleProperty = useSelector(state => state.property.saleProperty)
  const rentProperty = useSelector(state => state.property.rentProperty)
  const landProperty = useSelector(state => state.property.landProperty)

  const searchHandler = () => {
    Router.push({
      pathname: "/all-properties",
      query: { 
        property_for: activeTab
      },
    })
  }

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
                    {saleProperty && saleProperty.data.length > 0 ? (
                      <>
                        <ContainerCardProperty dataProperty={saleProperty} horizontal={false} />
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
                    {rentProperty && rentProperty.data.length > 0 ? (
                      <>
                        <ContainerCardProperty dataProperty={rentProperty} horizontal={false} />
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
                    {landProperty && landProperty.data.length > 0 ? (
                      <>
                        <ContainerCardProperty dataProperty={landProperty} horizontal={false} />
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
        </section>
      </Container>

      <section className="discover-propt">
        <div className="overlay-bg"></div>
        <Container>
          <div className="discover-text">
            <h3 className="fs-24-s">Discover a property you'll love to stay</h3>
            <p className="fs-14-s">
              Bali Hot Property network provides access to finest quality luxury
              real estate and businesses for sale to buyers around the globe. We
              help you with the process of finding, renting, or buying property
              and businesses in Bali, whether a buyer, a seller, or an investor,
              we think of our clients as family. Bali Hot Property has all types
              of luxury villas, land and businesses available, from modern
              beachfront villas with infinite pools seamlessly stretching
              straight to the ocean to hillside villas with sprawling terraces
              of green paddies right before the doorstep. Lean on us—we are here
              to keep the process fluid, successful, and as low-stress as
              possible. Not quite ready to buy or sell, but curious about
              neighbourhood options, local schools, our techniques, or current
              real estate “buzz”? Don’t be shy—reach out to us{" "}
              <Link href="/#contact-us" as="/#contact-us">
                <a className="text-reset">contact us</a>
              </Link>
              . Think of Bali Hot Property as your Bali Concierge. If we don’t
              know the answer, we will find it. We are a One Stop Shop for
              individuals, families and companies that have an interest in the
              Island of the Gods.
            </p>
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
            <Container className="px-0">
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
                    <CardPlace id={data.id} name={data.name} image={data.image} listing={data.listing} />
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
          <h3 className="text-white fs-16-s">Discover a property you'll love to stay</h3>
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
      `}</style>
      <style jsx>{HomeStyle}</style>
    </>
  );
};

export default Home;
