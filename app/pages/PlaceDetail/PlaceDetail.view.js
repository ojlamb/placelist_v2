import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditPlace from '../Components/EditPlace';

const MapBoxKey =
  'pk.eyJ1Ijoib3dlbmxhbWIiLCJhIjoiY2lleWljcnF4MDBiOXQ0bHR0anRvamtucSJ9.t3YnHHqvQZ8Y0MTCNy0NNw';

export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  flexGrow: 1,
  media: {
    height: 200,
    margin: 5,
    marginBottom: 20
  }
});

const getCardImage = data => require(`common/images/${data}.jpg`);

export class PlaceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      formOpen: false,
      deleteFormOpen: false,
    };
  }

  componentDidMount() {
    this.props.actions.getPlaceById(this.state.id);
  }

  deletePlace = () => {
    const { actions, history } = this.props;
    actions.deletePlace(this.state.id);
    history.push('/places');
  };

  updatePlace = (place) => {
    const { actions } = this.props;
    actions.updatePlace(place);
    this.handleClose();
  };


  handleClickEdit = () => {
    this.setState({ formOpen: true });
  };

  handleClose = () => {
    this.setState({ formOpen: false });
  };

  handleDeleteClose = () => {
    this.setState({ deleteFormOpen: false });
  }

  handleClickDelete = () => {
    this.setState({ deleteFormOpen: true });
  };


  render() {
    const { classes, place, session } = this.props;
    return (
      <div>
        { place && (
        <div>
          <EditPlace
            {...this.props}
            formOpen={this.state.formOpen}
            handleClose={this.handleClose}
            updatePlace={this.updatePlace}
          />

          <div style={{ margin: '10px' }}>
            <Paper className={classes.root} elevation={1}>
              <Grid container spacing={24}>
                <Grid item md={6} xs={12}>
                  <CardMedia
                    className={classes.media}
                    image={`https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/pin-s+3f51b5(${
                      this.props.place.lon
                    },${this.props.place.lat})/${this.props.place.lon},${
                      this.props.place.lat
                    }},14.0,0,0/570x270@2x?access_token=${MapBoxKey}`}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CardMedia
                    className={classes.media}
                    image={getCardImage(this.props.place.category)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="h6" component="h3">
                    {this.props.place.name}
                  </Typography>
                  <Typography component="p">{place.category}</Typography>
                  <Typography component="p">{place.upvotes}</Typography>
                  <Typography component="p">{place.address}</Typography>
                  <Typography component="p">{place.description}</Typography>
                  {
                          session.user.user.id === place.user.id && (
                          <div>
                            <Button onClick={this.handleClickEdit} size="small" color="primary">
                              Edit
                            </Button>
                            <Button
                              onClick={this.handleClickDelete}
                              size="small"
                              color="secondary"
                            >
                              Delete
                            </Button>
                          </div>
                          )}
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography component="p" variant="caption"><em>place added by <b>{place.user.name}</b></em></Typography>
                </Grid>
              </Grid>

            </Paper>
          </div>
          <Dialog
            open={this.state.deleteFormOpen}
            onClose={this.handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
                    Delete Place
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this place?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDeleteClose} color="primary">
                      No Cancel
              </Button>
              <Button onClick={this.deletePlace} color="secondary">
                      Yes I am Sure
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        )}
      </div>
    );
  }
}

PlaceDetail.propTypes = {
  actions: PropTypes.shape({
    getPlaceById: PropTypes.func.isRequired,
    updatePlace: PropTypes.func.isRequired,
    deletePlace: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  place: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    category: PropTypes.string,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }),
};
PlaceDetail.defaultProps = {
  place: null,
};


export default withStyles(styles)(PlaceDetail);
