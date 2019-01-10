import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  link: {
    textDecoration: 'none'
  }
};

const getCardImage = data => require(`common/images/${data}.jpg`);


export class PlaceInfo extends PureComponent {
  render() {
    const { classes, place } = this.props;
    const fullName = `${place.name}, ${place.address}`;
    const category = `${place.category}`;

    return (
      <div>
        <h4>{place.name}</h4>
        <img width={240} src={getCardImage(category)} alt="" />
        <br />
        <Link className={classes.link} to={`/place/${place.id}`}>
          <Button size="small" color="primary">
            More
          </Button>
        </Link>
        <a
          className={classes.link}
          target="_new"
          href={`https://www.google.com/search?q=${fullName}`}
        >
          <Button size="small" color="primary">
            Google
          </Button>
        </a>
      </div>
    );
  }
}

PlaceInfo.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlaceInfo);
