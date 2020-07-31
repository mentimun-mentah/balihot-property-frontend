import { useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import { GMapsOptions, libraries, myOptions, markerOptions } from "../../lib/GMaps-options"; 

import cx from 'classnames';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";

const default_center = { lat: -8.409518, lng: 115.188919 };
const mapContainerStyle = { height: "400px", width: "100%" };

const LocationInformation = ({property, setProperty, onChange}) => {
  const mapRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState();
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, libraries });
  const {location, latitude, longitude} = property; // Data for Map

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const onLoad = ref => {
    setAutocomplete(ref);
  };

  const placeChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (!place.geometry) return false

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      mapRef.current.fitBounds(place.geometry.viewport);
    } else {
      mapRef.current.setCenter(place.geometry.location);
      mapRef.current.setZoom(17); // Why 17? Because it looks good.
    }
    const data = {
      ...property,
      location: { value: place.formatted_address, isValid: true, message: null },
      latitude: { value: place.geometry.location.lat(), isValid: true, message: null },
      longitude: { value: place.geometry.location.lng(), isValid: true, message: null }
    }
    setProperty(data)
  };

  const dragEnd = e => {
    const data = {
      ...property,
      latitude: { value: e.latLng.lat(), isValid: true, message: null },
      longitude: { value: e.latLng.lng(), isValid: true, message: null }
    }
    setProperty(data)
  };

  const invalidLocation = cx({ "is-invalid": !location.isValid });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <Container fluid>
      <Row>
        <Col xl={12} lg={12} mb={12}>
          <Card className="hov_none">
            <Card.Header>
              <h3 className="mb-0">Add Properties Location</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={e => e.preventDefault()}>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Autocomplete onLoad={onLoad} onPlaceChanged={placeChanged} options={myOptions} >
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text className={invalidLocation && "border-invalid"}>
                          <i className="fal fa-map-marker-alt" />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control type="text" 
                        placeholder="Location" 
                        name="location"
                        className={invalidLocation}
                        value={location.value}
                        onChange={e => onChange(e, "input")}
                      />
                    </InputGroup>
                  </Autocomplete>
                  {location.message && (
                    <Form.Text className="text-muted fs-12 mb-n2 mt-0">{location.message}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-0">
                  <GoogleMap 
                    mapContainerStyle={mapContainerStyle} zoom={10} 
                    center={latitude.value && longitude.value ? {lat:latitude.value,lng:longitude.value} : default_center}
                    options={GMapsOptions} onLoad={onMapLoad} 
                  >
                    {latitude.value && longitude.value && (
                      <Marker 
                        icon={markerOptions} 
                        position={{lat: latitude.value, lng: longitude.value}} 
                        draggable={true} onDragEnd={dragEnd} 
                      />
                    )}
                  </GoogleMap>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LocationInformation
