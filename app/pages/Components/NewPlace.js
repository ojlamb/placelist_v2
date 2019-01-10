import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Validation, fieldValidatorCore } from 'react-validation-framework';
import validator from 'validator';
import MUIPlacesAutocomplete, {
  geocodeByPlaceID
} from 'mui-places-autocomplete';

// istanbul ignore next
fieldValidatorCore.addSupport(
  'TextField',
  event => event[0].target.value,
  (callback, args) => callback(args[0], undefined, args[0].target.value),
  'error'
);

export class NewPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {
        name: '',
        address: '',
        category: '',
        description: '',
        long_name: '',
        lat: 0,
        lon: 0
      },
      alertOpen: false
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.hasAddress = true;
    this.hasName = true;
  }

  onNameChange = (event) => {
    const { place } = this.state;
    place.name = event.target.value;
    this.setState({ place });
  };

  onAddressChange = (event) => {
    const { place } = this.state;
    place.address = event.target.value;
    this.setState({ place });
  };

  onCategoryChange = (event) => {
    const { place } = this.state;
    place.category = event.target.value;
    this.setState({ place });
  };

  onDescriptionChange = (event) => {
    const { place } = this.state;
    place.description = event.target.value;
    this.setState({ place });
  };

  onSuggestionSelected = (suggestion) => {
    const { place } = this.state;
    place.long_name = suggestion.description;
    place.name = suggestion.structured_formatting.main_text;
    geocodeByPlaceID(suggestion.place_id)
    // istanbul ignore next
      .then((results) => {
        const { geometry } = results[0];
        place.lat = geometry.location.lat();
        place.lon = geometry.location.lng();
        place.address = results[0].formatted_address;
        this.setState({ place });
      })
      .catch((err) => {
        throw (err); // eslint-disable-line no-console
      });
  };

  onClickSave = () => {
    const checkFieldTestResult = fieldValidatorCore.checkGroup('myGroup1');
    if (checkFieldTestResult.isValid) {
      if (this.state.place.category === '') {
        this.setState(prevState => ({
          viewport: {
            ...prevState.place,
            category: ''
          }
        }));
      }
      this.closeForm();
      this.props.createPlace(this.state.place);
    } else {
      this.setState({ alertOpen: true });
    }
  };

  closeForm = () => {
    this.setState({
      place: {
        name: '',
        address: '',
        category: '',
        description: '',
        lat: 0,
        lon: 0
      }
    });
    this.props.handleClose();
  };

  closeAlert = () => {
    this.setState({ alertOpen: false });
  };

  render() {
    if (this.state.place.address !== '') {
      this.hasAddress = true;
    } else {
      this.hasAddress = false;
    }
    if (this.state.place.name !== '') {
      this.hasName = true;
    } else {
      this.hasName = false;
    }
    return (
      <div>
        <Dialog
          open={this.props.formOpen}
          onClose={this.closeForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Place</DialogTitle>
          <DialogContent
            style={{
              paddingLeft: '25px',
              paddingRight: '25px'
            }}
          >
            <DialogContentText style={{ marginBottom: '10px' }}>
              Please fill out the place form to add your spot to the list!
            </DialogContentText>
            <MUIPlacesAutocomplete
              style={{
                marginTop: 25
              }}
              onSuggestionSelected={this.onSuggestionSelected}
              renderTarget={() => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                />
              )}
            />
            <Validation
              group="myGroup1"
              validators={[
                {
                  validator: val => !validator.isEmpty(val)
                }
              ]}
            >
              <TextField
                margin="dense"
                id="name"
                label="Name"
                type="name"
                fullWidth
                error={!this.hasName}
                helperText={this.hasName ? '' : 'Name cannot be blank'}
                onChange={this.onNameChange}
                value={this.state.place.name}
              />
            </Validation>
            <Validation
              group="myGroup1"
              validators={[
                {
                  validator: val => !validator.isEmpty(val)
                }
              ]}
            >
              <TextField
                margin="dense"
                id="name"
                label="Address"
                type="address"
                fullWidth
                error={!this.hasAddress}
                helperText={this.hasAddress ? '' : 'Address cannot be blank'}
                onChange={this.onAddressChange}
                value={this.state.place.address}
              />
            </Validation>
            <Select
              style={{ marginTop: '13px' }}
              onChange={this.onCategoryChange}
              value={this.state.place.category}
              fullWidth
              id="name"
              label="Category"
              name="category"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Category
              </MenuItem>
              <MenuItem value="drinks">Drinks</MenuItem>
              <MenuItem value="dinner">Dinner</MenuItem>
              <MenuItem value="burgers">Burgers</MenuItem>
              <MenuItem value="tacos">Tacos</MenuItem>
              <MenuItem value="sushi">Sushi</MenuItem>
              <MenuItem value="brewery">Brewery</MenuItem>
              <MenuItem value="club">Club</MenuItem>
              <MenuItem value="coffee">Coffee</MenuItem>
              <MenuItem value="lunch">Lunch</MenuItem>
              <MenuItem value="brunch">Brunch</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            <TextField
              margin="dense"
              id="name"
              label="Description"
              type="description"
              fullWidth
              onChange={this.onDescriptionChange}
              value={this.state.place.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onClickSave} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.alertOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Form Errors</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please fill out all required fields
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeAlert} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

NewPlace.propTypes = {
  createPlace: PropTypes.func.isRequired,
  formOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default NewPlace;
