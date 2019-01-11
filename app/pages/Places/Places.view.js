import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PlaceCard from './PlaceCard';
import NewPlace from '../Components/NewPlace';

export const styles = theme => ({
  actionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  layout: {
    width: 'auto',
    margin: '10px',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  }
});

export class PlaceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      formOpen: false
    };
    this.createPlace = this.createPlace.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadPlaces();
  }

  handleClickOpen = () => {
    this.setState({ formOpen: true });
  };

  handleClose = () => {
    this.setState({ formOpen: false });
  };

  createPlace = (place) => {
    const { actions } = this.props;
    actions.createPlace(place);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab
          color="primary"
          aria-label="Add"
          className={classNames(classes.button, classes.actionButton)}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <NewPlace {...this.state} createPlace={this.createPlace} handleClose={this.handleClose} />
        <div
          style={{ maxHeight: '100vh', overflow: 'auto' }}
        >
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={32}>
              {this.props.places.map((place, i) => (
                <Grid item key={i} sm={6} md={4} lg={3}>
                  <PlaceCard {...place} key={place.id} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

PlaceView.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  places: PropTypes.array.isRequired,
};

export default withStyles(styles)(PlaceView);
