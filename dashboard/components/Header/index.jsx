import { useRouter } from "next/router";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Header = () => {
  const { pathname } = useRouter();
  let dashboard = '/admin'
  let page = pathname.replace("/", "").split("/")[1]
  let newPage, finalPage
  if(pathname.startsWith("/admin/")){
    newPage = page.replace("-", " ")
    finalPage = newPage.replace("/[id]","")
  }else{
    finalPage = pathname.replace("/", "")
  }

  return (
    <>
      <div className="header">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="12" xs="12">
                <h6 className="h2 d-inline-block mb-0 text-capitalize">{finalPage}</h6>
                <Breadcrumb className="d-none d-md-inline-block ml-md-4">
                  <Breadcrumb.Item>
                    <i className="fas fa-house-flood"></i>
                  </Breadcrumb.Item>
                  {pathname === dashboard ? (
                    <>
                      <Breadcrumb.Item>General</Breadcrumb.Item>
                      <Breadcrumb.Item active className="text-capitalize">
                        Dashboard
                      </Breadcrumb.Item>
                    </>
                  ) : (
                    <>
                      <Breadcrumb.Item>Administration</Breadcrumb.Item>
                      <Breadcrumb.Item active className="text-capitalize">
                      {pathname.startsWith("/admin/manage-") ? "" : pathname.startsWith("/admin/manage-") ? "" : "Add"} 
                      {" "}{finalPage}
                      </Breadcrumb.Item>
                    </>
                  )}
                </Breadcrumb>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default React.memo(Header);
