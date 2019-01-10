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

export class EditPlace extends React.Component {
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
      }
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onCategoryChange = (event) => {
    const { place } = this.props;
    place.category = event.target.value;
    this.setState({ place });
  };

  onDescriptionChange = (event) => {
    const { place } = this.props;
    place.description = event.target.value;
    this.setState({ place });
  };

  onClickSave = () => {
    this.props.updatePlace(this.props.place);
  };

  closeForm = () => {
    this.props.handleClose();
  };

  render() {
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
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="name"
              fullWidth
              disabled
              value={this.props.place.name}
            />
            <TextField
              margin="dense"
              id="name"
              label="Address"
              type="address"
              fullWidth
              disabled
              value={this.props.place.address}
            />
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
              value={this.props.place.description}
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
      </div>
    );
  }
}

EditPlace.propTypes = {
  formOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  updatePlace: PropTypes.func.isRequired,
};

export default EditPlace;
