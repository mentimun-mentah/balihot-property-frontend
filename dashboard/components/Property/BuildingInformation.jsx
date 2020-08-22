import { Select } from "antd";
import cx from 'classnames';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";

const BuildingInformation = (
  {bedroom, bathroom, building_size, land_size, facilities, facility_list, onChange, except_villa}
) => {
  const invalidBedroom = cx({ "is-invalid": !bedroom.isValid });
  const invalidBathroom = cx({ "is-invalid": !bathroom.isValid });
  const invalidFacility = cx({ "is-invalid": !facilities.isValid });
  const invalidBuilding_size = cx({ "is-invalid": !building_size.isValid });
  const invalidLand_size = cx({ "is-invalid": !land_size.isValid });

  return (
    <Container fluid>
      <Row>
        <Col xl={12} lg={12} mb={12}>
          <Card className="hov_none">
            <Card.Header>
              <h3 className="mb-0">Add Properties Building Information</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>
                      Bedroom
                      {except_villa && <i className="text-info ml-2">optional</i>}
                    </Form.Label>
                    <Form.Control type="number"
                      placeholder="Bedroom"
                      name="bedroom"
                      className={invalidBedroom}
                      value={bedroom.value && bedroom.value}
                      onChange={e => onChange(e, "input")}
                    />
                    {bedroom.message && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{bedroom.message}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>
                      Bathroom
                      {except_villa && <i className="text-info ml-2">optional</i>}
                    </Form.Label>
                    <Form.Control type="number"
                      placeholder="Bathroom"
                      name="bathroom"
                      className={invalidBathroom}
                      value={bathroom.value && bathroom.value}
                      onChange={e => onChange(e, "input")}
                    />
                    {bathroom.message && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{bathroom.message}</Form.Text>
                    )}
                  </Form.Group>
                </Form.Row>

                <Form.Group>
                  <Form.Label>Facilities</Form.Label>
                  <Select mode="multiple"
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Type and press enter"
                    className={invalidFacility}
                    value={facilities.value}
                    onChange={e => onChange(e, "facilities")}
                  >
                    {facility_list}
                  </Select>
                  {facilities.message && (
                    <Form.Text className="text-muted fs-12 mb-n2 mt-0">{facilities.message}</Form.Text>
                  )}
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} className="mb-0">
                    <Form.Label>Building Size</Form.Label>
                    <InputGroup>
                      <Form.Control type="number"
                        placeholder="Building Size"
                        name="building_size"
                        className={invalidBuilding_size}
                        value={building_size.value}
                        onChange={e => onChange(e, "input")}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text className={invalidBuilding_size && "border-invalid"}>m²</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    {building_size.message && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{building_size.message}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} className="mb-0">
                    <Form.Label>Land Size</Form.Label>
                    <InputGroup>
                      <Form.Control type="number" 
                        placeholder="Land Size"
                        name="land_size"
                        className={invalidLand_size}
                        value={land_size.value}
                        onChange={e => onChange(e, "input")}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text className={invalidLand_size && "border-invalid"}>are</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    {land_size.message && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{land_size.message}</Form.Text>
                    )}
                  </Form.Group>
                </Form.Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuildingInformation;
