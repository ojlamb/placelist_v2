import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  link: {
    textDecoration: 'none',
  }
};


const getCardImage = data => require(`common/images/${data}.jpg`);


export class PlaceCard extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={getCardImage(this.props.category)}
          title={this.props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.name}
          </Typography>
          <Typography component="p">{this.props.address}</Typography>
        </CardContent>
        <CardActions>
          <Link className={classes.link} to={`/place/${this.props.id}`}>
            <Button size="small" color="primary">
              More
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
}
PlaceCard.propTypes = {
  address: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(PlaceCard);
