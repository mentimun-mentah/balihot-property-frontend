import { useRouter } from "next/router";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Link from "next/link";

const ADMIN_ROUTE = '/admin'

const Sidebar = () => {
  const { pathname } = useRouter();
  const dashboard = pathname === "/admin"
  const region = pathname.startsWith("/admin/region")
  const teams = pathname.startsWith("/admin/teams")
  const property = pathname.startsWith("/admin/property")
  const facilities = pathname.startsWith("/admin/facilities")
  const manage_property = pathname.startsWith("/admin/manage-property")

  const clickHandle = () => {
    document.location.href = process.env.BASE_URL;
  }

  return (
    <>
      <Navbar className="navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" expand="md" >
        <Container fluid>
          <Navbar.Brand className="pt-0 pb-0" onClick={clickHandle}>
            <img
              alt="BaliHotProperty"
              className="navbar-brand-img hov_pointer"
              src="/static/images/balihot-property-logo-red.png"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="flex-column">
              <h6 className="navbar-heading text-muted nav-link h-6">
                General
              </h6>
              <Link href={ADMIN_ROUTE} as={ADMIN_ROUTE}>
                <Nav.Link as="a" className={dashboard ? "hov_pointer active" : "hov_pointer"}>
                  <i className="far fa-house-flood" /> Dashboard
                </Nav.Link>
              </Link>
              <Nav.Link as="a" onClick={clickHandle} className="hov_pointer">
                <i className="far fa-door-open" /> Home
              </Nav.Link>

              <h6 className="navbar-heading text-muted nav-link h-6">
                Administration
              </h6>

              <Link href={`${ADMIN_ROUTE}/region`} as={`${ADMIN_ROUTE}/region`}>
                <Nav.Link as="a" className={region ? "hov_pointer active" : "hov_pointer"}>
                  <i className="far fa-compass text-danger" /> Add Region
                </Nav.Link>
              </Link>
              <Link href={`${ADMIN_ROUTE}/teams`} as={`${ADMIN_ROUTE}/teams`}>
                <Nav.Link as="a" className={teams ? "hov_pointer active" : "hov_pointer"}>
                  <i className="far fa-users-crown" /> Add Teams
                </Nav.Link>
              </Link>
              <Link href={`${ADMIN_ROUTE}/property`} as={`${ADMIN_ROUTE}/property`}>
                <Nav.Link as="a" className={property ? "hov_pointer active" : "hov_pointer"}>
                  <i className="far fa-file-plus text-info" /> Add Property
                </Nav.Link>
              </Link>
              <Link href={`${ADMIN_ROUTE}/facilities`} as={`${ADMIN_ROUTE}/facilities`}>
                <Nav.Link as="a" className={facilities ? "hov_pointer active" : "hov_pointer"}>
                  <i className="far fa-sitemap text-primary"></i> Add Facilities
                </Nav.Link>
              </Link>
              <Link href={`${ADMIN_ROUTE}/manage-property`} as={`${ADMIN_ROUTE}/manage-property`}>
                <Nav.Link as="a" className={manage_property ? "hov_pointer active" : "hov_pointer"}>
                  <i className="far fa-tasks text-warning"></i> Manage Property
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidebar;
