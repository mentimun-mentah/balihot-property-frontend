import { Container, Row, Col } from "react-bootstrap";

const Workflow = () => {
  return (
    <>
      <section>
        <Container className="mb-5 workflow">
          <Row className="workflow_row">
            <div className="workflow_rocket">
              <img src="/static/images/workflow/rocket.png" className="w-90vw d-none d-lg-block d-xl-block" />
            </div>
            <Col lg={4}>
              <div className="workflow_item mb-3">
                <div className="workflow_image_container d-flex flex-column align-items-center justify-content-center">
                  <div className="workflow_image_background bg-workflow">
                    <div>
                      <div className="workflow_circle_outer trans_200" />
                      <div className="workflow_circle_inner trans_200" />
                      <div className="workflow_num text-center trans_200">
                        <span>01.</span>
                      </div>
                    </div>
                    <div className="workflow_image">
                      <img src="/static/images/workflow/workflow_1.png" />
                    </div>
                  </div>
                  <div className="workflow_item_content text-center">
                    <div className="workflow_title fs-18-s">Choose a Location</div>
                    <p className="workflow_text fs-14-s">
                      Beach-front, mountain-top, city-view — these are all highly sought after property types.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="workflow_item mb-3">
                <div className="workflow_image_container d-flex flex-column align-items-center justify-content-center">
                  <div className="workflow_image_background bg-workflow">
                    <div>
                      <div className="workflow_circle_outer trans_200" />
                      <div className="workflow_circle_inner trans_200" />
                      <div className="workflow_num text-center trans_200">
                        <span>02.</span>
                      </div>
                    </div>
                    <div className="workflow_image">
                      <img src="/static/images/workflow/workflow_2.png" />
                    </div>
                  </div>
                  <div className="workflow_item_content text-center">
                    <div className="workflow_title fs-18-s">Find the Perfect Places</div>
                    <p className="workflow_text fs-14-s">
                      The land the house is on and the lifestyle that goes with it is location’s first interest.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="workflow_item mb-3">
                <div className="workflow_image_container d-flex flex-column align-items-center justify-content-center">
                  <div className="workflow_image_background bg-workflow">
                    <div>
                      <div className="workflow_circle_outer trans_200" />
                      <div className="workflow_circle_inner trans_200" />
                      <div className="workflow_num text-center trans_200">
                        <span>03.</span>
                      </div>
                    </div>
                    <div className="workflow_image">
                      <img src="/static/images/workflow/workflow_3.png" />
                    </div>
                  </div>
                  <div className="workflow_item_content text-center">
                    <div className="workflow_title fs-18-s">Move into a new life</div>
                    <p className="workflow_text fs-14-s">
                    whether it’s a quick elevator ride to a street full of restaurants or a sunset worthy of magazine photos. A lot may be forgiven if a property is close to or even within view of these things.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <style jsx>{`
        /* Workflow */
        :global(.workflow) {
          display: block;
          position: relative;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        :global(.workflow_row) {
          margin-top: 20px;
        }
        :global(.workflow_rocket) {
          position: absolute;
          top: 15%;
          left: 50%;
          -webkit-transform: translateX(-50%);
          -moz-transform: translateX(-50%);
          -ms-transform: translateX(-50%);
          -o-transform: translateX(-50%);
          transform: translateX(-50%);
        }
        :global(.workflow_image_background) {
          width: 227px;
          height: 227px;
        }
        :global(.bg-workflow) {
          display: block;
          position: relative;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        .workflow_circle_outer,
        .workflow_circle_inner,
        .workflow_image {
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
        .workflow_circle_outer {
          background: #edeff4;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0.9;
          z-index: 1;
        }
        .workflow_circle_inner {
          width: 166px;
          height: 166px;
          border-radius: 50%;
          background: #e1e5ec;
          z-index: 2;
        }
        :global(.workflow_image) {
          top: 29%;
          z-index: 4;
        }
        .workflow_num {
          position: absolute;
          top: -11px;
          left: 34px;
          width: 42px;
          height: 42px;
          background: #abb2bf;
          border-radius: 50%;
          z-index: 3;
        }
        .workflow_num span {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          line-height: 42px;
        }
        .workflow_item_content {
          margin-top: 30px;
        }
        .workflow_title {
          font-size: 18px;
          font-weight: 700;
          color: #021927;
        }
        .workflow_text {
          color: #6c757d;
          margin-top: 17px;
          margin-bottom: 0px;
        }
        @media only screen and (max-width: 738px) {
          .workflow_rocket {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Workflow;
