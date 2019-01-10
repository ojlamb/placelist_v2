import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import MapPin from './MapPin';
import PlaceInfo from './PlaceInfo';
import NewPlace from '../Components/NewPlace';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export const styles = theme => ({
  actionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex: 2000
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  }
});

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 500,
        height: 500,
        latitude: 39.7392,
        longitude: -104.9903,
        bearing: 0,
        pitch: 0,
        maxZoom: 18,
        zoom: 10
      },
      popupInfo: null,
      places: [],
      formOpen: false,
      handleClose: this.handleClose,
      createPlace: this.createPlace
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadPlaces();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  handleClickOpen = () => {
    this.setState({ formOpen: true });
  };

  handleClose = () => {
    this.setState({ formOpen: false });
  };

  createPlace = (place) => {
    this.props.actions.createPlace(place);
    this.handleClose();
  };

  updateWindowDimensions() {
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        width: window.innerWidth,
        height: window.innerHeight - 64
      }
    }));
  }

  renderPlaceMarker(place, index) {
    return (
      <Marker key={index} longitude={place.lon} latitude={place.lat}>
        <MapPin size={20} onClick={() => this.setState({ popupInfo: place })} />
      </Marker>
    );
  }

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          closeOnClick={false}
          longitude={popupInfo.lon}
          latitude={popupInfo.lat}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <PlaceInfo place={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { classes, places } = this.props;
    const { viewport } = this.state;
    return (
      <div>
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          className={classNames(classes.button, classes.actionButton)}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Button>
        <NewPlace {...this.state} />
        <div>
          <MapGL
            mapStyle="mapbox://styles/owenlamb/cjlfragh72pll2rpb8n4j2j0e"
            mapboxApiAccessToken="pk.eyJ1Ijoib3dlbmxhbWIiLCJhIjoiY2lleWljcnF4MDBiOXQ0bHR0anRvamtucSJ9.t3YnHHqvQZ8Y0MTCNy0NNw"
            {...viewport}
            onViewportChange={this.updateViewport}
          >
            {places.map((place, index) => this.renderPlaceMarker(place, index))}
            {this.renderPopup()}
            <div className="nav" style={navStyle}>
              <NavigationControl onViewportChange={this.updateViewport} />
            </div>
          </MapGL>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  actions: PropTypes.shape({
    loadPlaces: PropTypes.func.isRequired,
    createPlace: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
  places: PropTypes.array.isRequired,
};

export default withStyles(styles)(Map);
