import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="site-footer border-top">
        <Container>
          <Row>
            <Col sm={12} md={6}>
              <img
                src="/static/images/balihot-property-logo-red.png"
                width="250"
              />
              <p className="text-justify mt-3 fs-14-s">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                iverra tellus in. Sollicitudin ac orci phasellus egestas. Purus
                in mollis nunc sed. Sollicitudin ac orci phasellus egestas
                tellus rutrum tellus pellentesque. Interdum consectetur libero
                id faucibus nisl tincidunt eget.
              </p>
            </Col>
            <Col sm={12} md={4} className="pl-ft-50 pl-md-2 pl-xl-5 pr-md-2">
              <h6>Contact Us</h6>
              <ul className="footer-links mt-3 fs-14-s">
                <li className="mb-2">
                  <i className="fal fa-map-marker-alt mr-2"></i> 432 Park Ave,
                  New York, NY 10022
                </li>
                <li className="mb-2">
                  <i className="fal fa-phone mr-2"></i> (844) 380-8603
                </li>
                <li>
                  <i className="fal fa-envelope mr-2"></i>{" "}
                  support@balihot-property.com
                </li>
              </ul>
            </Col>
            <Col sm={12} md={2}>
              <h6>Quick Links</h6>
              <ul className="footer-links mt-3 fs-14-s">
                <Link href="/#about-us" as="/#about-us">
                  <li className="mb-2">About Us</li>
                </Link>
                <Link href="/#contact-us" as="/#contact-us">
                  <li className="mb-2">Contact Us</li>
                </Link>
                <Link href="/#property" as="/#property">
                  <li>Property</li>
                </Link>
              </ul>
            </Col>
          </Row>
          <hr />
        </Container>

        <Container>
          <Row>
            <Col xs={12} sm={6} md={8}>
              <p className="copyright-text">
                Copyright &copy; 2020 All Rights Reserved by{" "}
                <a href="#">BaliHotProperty</a>.
              </p>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ul className="social-icons">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
      <style jsx>{`
        .site-footer {
          padding: 45px 15px 15px 15px;
          font-size: 15px;
          line-height: 24px;
          color: #222222;
        }
        .site-footer hr {
          border-top-color: #bbb;
          opacity: 0.5;
        }
        .site-footer hr.small {
          margin: 20px 0;
        }
        .site-footer h6 {
          color: black;
          font-size: 16px;
          text-transform: uppercase;
          margin-top: 5px;
          letter-spacing: 2px;
        }
        .site-footer a {
          color: #222222;
        }
        .site-footer a:hover {
          color: #3366cc;
          text-decoration: none;
        }
        .footer-links {
          padding-left: 0;
          list-style: none;
        }
        .footer-links li {
          display: block;
        }
        .footer-links a {
          color: #222222;
        }
        .footer-links a:active,
        .footer-links a:focus,
        .footer-links a:hover {
          color: #3366cc;
          text-decoration: none;
        }
        .footer-links.inline li {
          display: inline-block;
        }
        .site-footer .social-icons {
          text-align: right;
        }
        .site-footer .social-icons a {
          width: 40px;
          height: 40px;
          line-height: 40px;
          margin-left: 6px;
          margin-right: 0;
          border-radius: 100%;
          background-color: #551a8b;
        }
        .copyright-text {
          margin: 0;
        }
        @media (max-width: 991px) {
          .site-footer [class^="col-"] {
            margin-bottom: 30px;
          }
        }
        @media (max-width: 767px) {
          .site-footer {
            padding-bottom: 0;
          }
          .site-footer .copyright-text,
          .site-footer .social-icons {
            text-align: center;
          }
        }
        .social-icons {
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
        }
        .social-icons li {
          display: inline-block;
          margin-bottom: 4px;
        }
        .social-icons li.title {
          margin-right: 15px;
          text-transform: uppercase;
          color: #96a2b2;
          font-weight: 700;
          font-size: 13px;
        }
        .social-icons a {
          background-color: #eceeef;
          color: white;
          font-size: 16px;
          display: inline-block;
          line-height: 44px;
          width: 44px;
          height: 44px;
          text-align: center;
          margin-right: 8px;
          border-radius: 100%;
          -webkit-transition: all 0.2s linear;
          -o-transition: all 0.2s linear;
          transition: all 0.2s linear;
        }
        :global(.social-icons a:active, .social-icons a:focus, .social-icons
            a:hover) {
          color: #fff !important;
          background-color: #29aafe !important;
        }
        .social-icons.size-sm a {
          line-height: 34px;
          height: 34px;
          width: 34px;
          font-size: 14px;
        }
        @media (max-width: 767px) {
          .social-icons li.title {
            display: block;
            margin-right: 0;
            font-weight: 600;
          }
          :global(.pl-ft-50) {
            padding-left: 15px;
          }
        }
        @media (min-width: 768px) {
          :global(.pl-ft-50) {
            padding-left: 80px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
