import { useState, useCallback } from "react";
import { compose, withProps, withState, withHandlers } from "recompose";
import { Container, Row, Col } from "react-bootstrap";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "../Transition";
import { GMapsOptions, markerOptions, markerClicked } from "./GMaps-options";
import SearchBox from "./Search";
import CardHorizontal from "../Card/CardHorizontal";
import CardMarker from "../Card/CardMarker";
import CardHorizontalPlaceholder from "../Transition/CardHorizontalPlaceholder";

const IMAGE_PROPERTY = "/static/images/properties/";

const infoOptions = {
  pixelOffset: { width: 0, height: -35 },
};

let marker_list = [
  {
    position: { lat: -8.340539, lng: 115.091948 },
    price: "$200",
    name: "bali property for sale – chill house hipster retreat",
    image: `${IMAGE_PROPERTY}1.jpg`,
    location: "canggu, pererenan",
    clicked: false,
  },
  {
    position: { lat: -8.267559, lng: 114.524339 },
    price: "$1800",
    name: "flawless uluwatu villa zsa zsa finally for sale",
    image: `${IMAGE_PROPERTY}2.jpg`,
    location: "canggu, tabanan, tanah lot",
    clicked: false,
  },
  {
    position: { lat: -8.506854, lng: 115.262482 },
    price: "$1300",
    name: "high ranking boutique resort for sale in sanur",
    image: `${IMAGE_PROPERTY}3.jpg`,
    location: "bukit, ungasan",
    clicked: false,
  },
  {
    position: { lat: -8.438413, lng: 115.496922 },
    price: "$3900",
    name: "modern bali villa for rent in seminyak",
    image: `${IMAGE_PROPERTY}4.jpg`,
    location: "ubud, tegallalang",
    clicked: false,
  },
  {
    position: { lat: -8.811012, lng: 115.173601 },
    price: "$2200",
    name: "chic serenity in beach lovers paradise – sanur.",
    image: `${IMAGE_PROPERTY}5.jpg`,
    location: "canggu, berawa",
    clicked: false,
  },
  {
    position: { lat: -8.582952, lng: 115.085652 },
    price: "$550",
    name: "breathtaking exotic sanur residence",
    image: `${IMAGE_PROPERTY}6.jpg`,
    location: "canggu, mengwi, tumbak",
    clicked: false,
  },
];

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    loadingElement: <div style={{ height: "calc(100vh - 4.2rem)" }} />,
    containerElement: <div style={{ height: `calc(100vh - 4.2rem)` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withState("center", "setCenter", { lat: -8.340539, lng: 115.091949 }),
  withState("markers", "setMarkers", marker_list),
  withState("current_position", "setCurrent_position", {}),
  withState("currentMidx", "setCurrentMidx", null),
  withState("circle_markers", "setCircle_markers", []),
  withState("markerInfo", "setMarkerInfo", null),
  withState("click", "setClick", false),
  withState("current_zoom", "setCurrent_zoom", 10),
  withState("radius", "setRadius", null),
  withState("searchLoading", "setSearchLoading", false),
  withState("afterLoading", "setAfterLoading", false),
  withHandlers(() => {
    const refs = {
      map: undefined,
    };
    return {
      onMapMounted: ({ setCurrent_position, center, setRadius }) => (ref) => {
        refs.map = ref;
        setCurrent_position(center);
        setRadius(30 * 1000); // 30 km
      },
      updateZoom: ({ setCurrent_zoom }) => () => {
        setCurrent_zoom(refs.map.getZoom());
      },
      updateCenter: ({ setCurrent_position }) => () => {
        setCurrent_position(refs.map.getCenter().toJSON());
      },
      tilesLoaded: ({ setClick }) => () => {
        setClick(false);
      },
      updateData: ({
        current_position,
        setCircle_markers,
        markers,
        current_zoom,
        radius,
        setRadius,
        setSearchLoading,
        setAfterLoading,
      }) => () => {
        setSearchLoading(true);
        setTimeout(() => {
          setSearchLoading(false);

          if (current_zoom) {
            if (current_zoom <= 7) {
              setCircle_markers([]);
              return false;
            }
            if (current_zoom == 8) setRadius(60 * 1000); // 60 km
            if (current_zoom == 9) setRadius(50 * 1000); // 50 km
            if (current_zoom == 10) setRadius(30 * 1000); // 30 km
            if (current_zoom == 11) setRadius(20 * 1000); //20 km
            if (current_zoom >= 12) setRadius(10 * 1000); // 10 km
            if (current_zoom >= 13) setRadius((30 * 1000) / current_zoom);
          }
          const searchArea = new window.google.maps.Circle({
            center: new window.google.maps.LatLng(current_position.lat, current_position.lng),
            radius: radius,
          });

          let circle_data = [];

          markers.map((m) => {
            let position = new google.maps.LatLng(m.position.lat, m.position.lng);
            if (
              window.google.maps.geometry.spherical.computeDistanceBetween(
                position,
                searchArea.getCenter()
              ) <= searchArea.getRadius()
            ) {
              circle_data.push(m);
            }
          });
          setCircle_markers(circle_data);

          setAfterLoading(true);
        }, 500);
      },
      markerInfoWindow: ({ setMarkerInfo, setClick }) => (marker) => {
        marker.clicked = true;
        setMarkerInfo(marker);
        setClick(true);
      },
    };
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  props.dataOnCircle(props.circle_markers);
  props.searchLoadingData(props.searchLoading);
  props.afterLoadingData(props.afterLoading);
  //set Clicked Window Info to false on hover card
  if (props.isHover) props.setClick(false);

  const infoWindowClicked = () => (
    <CardMarker
      name={props.markerInfo.name}
      image={props.markerInfo.image}
      price={props.markerInfo.price}
    />
  );

  const infoWindowHover = () => (
    <h6 className="text-center pt-3 pb-2 px-3">{props.hoverInfoWindowPos.price}</h6>
  );

  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={10}
      defaultCenter={props.center}
      onCenterChanged={props.updateCenter}
      onZoomChanged={props.updateZoom}
      onIdle={props.updateData}
      defaultOptions={GMapsOptions}
      onTilesLoaded={props.tilesLoaded}
    >
      {props.circle_markers.map((m, i) => (
        <Marker
          key={i}
          icon={m.clicked ? markerClicked : markerOptions}
          position={{ lat: m.position.lat, lng: m.position.lng }}
          onClick={() => props.markerInfoWindow(m, i)}
        ></Marker>
      ))}

      {props.click && (
        <InfoWindow options={infoOptions} position={props.markerInfo.position}>
          {infoWindowClicked()}
        </InfoWindow>
      )}

      {props.isHover && (
        <InfoWindow options={infoOptions} position={props.hoverInfoWindowPos.position}>
          {infoWindowHover()}
        </InfoWindow>
      )}
    </GoogleMap>
  );
});

const Map = () => {
  const [dataOnCircle, setDataOnCircle] = useState();
  const [infoWindowPos, setInfoWindowPos] = useState();
  const [isHover, setIsHover] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [afterLoading, setAfterLoading] = useState(false);

  const dataOnCircleHandler = (v) => setDataOnCircle(v);
  const searchLoadingHandler = (v) => setSearchLoading(v);
  const afterLoadingHandler = (v) => setAfterLoading(v);

  const onHoverWindowHandler = useCallback((m, i) => {
    setIsHover(true);
    setInfoWindowPos({ ...m, idx: i });
  }, []);

  let dataResult;
  if (searchLoading) {
    dataResult = (
      <>
        <div className="spinner-border spinner-border-sm mr-2 mb-1 fs-12" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <span>Searching...</span>
      </>
    );
  }
  if (afterLoading && !searchLoading) {
    dataResult = (
      <motion.span initial="initial" animate="in" exit="out" variants={Fade}>
        {dataOnCircle && dataOnCircle.length} of {marker_list.length} results
      </motion.span>
    );
  }

  return (
    <>
      <Row className="mt-4k2rem w-100vw">
        <Col className="position-sticky">
          <AnimatePresence exitBeforeEnter key={searchLoading}>
            <span className="position-absolute text-searching badge badge-light text-center">
              {dataResult}
            </span>
          </AnimatePresence>
          <MapComponent
            dataOnCircle={dataOnCircleHandler}
            isHover={isHover}
            hoverInfoWindowPos={infoWindowPos}
            searchLoadingData={searchLoadingHandler}
            afterLoadingData={afterLoadingHandler}
          />
        </Col>

        <Col className="card-wrapper px-0 pt-5">
          <Container>
            <SearchBox />
            <p className="pt-3 font-weight-bold">{dataOnCircle && dataOnCircle.length} results</p>
            {dataOnCircle &&
              dataOnCircle.map((m, i) => (
                <Col
                  lg={12}
                  key={i}
                  className="px-0"
                  onMouseEnter={() => onHoverWindowHandler(m, i)}
                  onMouseLeave={() => setIsHover(false)}
                >
                  {searchLoading && <CardHorizontalPlaceholder />}
                  {!searchLoading && (
                    <CardHorizontal
                      name={m.name}
                      price={m.price}
                      location={m.location}
                      position={m.position}
                      image={m.image}
                    />
                  )}
                </Col>
              ))}
          </Container>
        </Col>
      </Row>

      <style jsx>{`
        :global(.info) {
          padding: 10px;
          text-align: left;
          overflow-wrap: break-word;
        }
        :global(.info .location) {
          font-size: 14px !important;
          max-width: 230px;
        }
        :global(.info .title) {
          font-weight: 400 !important;
          color: rgb(34, 34, 34) !important;
          font-size: 16px !important;
          padding-bottom: 5px;
          max-width: 230px;
        }
        :global(.info .price) {
          color: rgb(34, 34, 34) !important;
          font-weight: 800;
          font-size: 16px !important;
        }
      `}</style>
      <style jsx>{`
        :global(.card-wrapper) {
          overflow-y: scroll;
          overflow-x: hidden;
          height: calc(100vh - 4.2rem);
        }
        :global(.card-wrapper::-webkit-scrollbar) {
          display: none;
        }
        :global(.map-search-title) {
          font-weight: 600 !important;
          color: rgb(34, 34, 34) !important;
        }
        .text-searching {
          z-index: 10;
          margin: 0 auto;
          top: 2.1rem;
          font-size: 1rem;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 15px 20px;
          align-items: center !important;
          justify-content: center !important;
          background: rgb(255, 255, 255) !important;
          border-radius: 8px !important;
        }
        :global(.dropdown-toggle::after) {
          display: inline-block;
          margin-right: 0px;
          margin-top: 10px !important;
          float: right;
          content: "";
          border-top: 0.3em solid;
          border-right: 0.3em solid transparent;
          border-bottom: 0;
          border-left: 0.3em solid transparent;
        }
        :global(.dropdown-text-turncate .text) {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 90%;
          display: inline-block;
          vertical-align: middle;
        }
        /*SLIDER*/
        :global(.rc-slider-rail) {
          height: 7px;
        }
        :global(.rc-slider-track) {
          height: 7px;
          background-color: #ff385c;
        }
        :global(.rc-slider-handle) {
          width: 25px;
          height: 25px;
          margin-top: -10px;
          border: 1px solid #c5c5c5;
        }
        :global(.rc-slider-handle:before) {
          background-color: #ff5a5f;
          border-radius: 10px;
          content: "";
          height: 11px;
          left: 0;
          margin: 0 auto;
          position: absolute;
          right: 0;
          top: 6px;
          width: 11px;
        }
        :global(.rc-slider-handle:active) {
          border: 1px solid #c5c5c5;
        }
        :global(.rc-slider-handle:hover) {
          border-color: #c5c5c5;
        }
        :global(.rc-slider-handle-dragging) {
          border: 1px solid #c5c5c5;
        }
        :global(.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging) {
          border-color: #c5c5c5;
          box-shadow: 0px 0px 5px 0px rgba(19, 19, 28, 0.2);
        }
        :global(.rc-slider-handle:focus) {
          outline: none;
        }
        :global(.rc-slider-handle-click-focused:focus) {
          border-color: #c5c5c5;
          box-shadow: unset;
        }
        :global(.rc-slider-dot-active) {
          border-color: #c5c5c5;
        }
        /*SLIDER*/
      `}</style>
    </>
  );
};

export default Map;
