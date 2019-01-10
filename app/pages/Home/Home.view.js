import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export const styles = {
  background: {
    backgroundImage: `url(${require('./static/5.jpg')})`,
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    marginTop: 5,

  },
  hero: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'rga(250, 250, 250, 0.5)',
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  button: {
    margin: 10
  }
};

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { classes, session } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.hero}>
          <h1>Welcome to PlaceList</h1>
          <p>List, map, share and rank your spots</p>
          {session.active ? (
            <Link style={{ textDecoration: 'none' }} to="/places">
              <Button variant="contained" color="primary">
              Explore the List
              </Button>
            </Link>
          ) :
            (
              <div>
                <div>
                  <Link className={classes.link} to="/login">
                    <Button className={classes.button} variant="contained" color="primary">
                    Login
                    </Button>
                  </Link>
                  <Link className={classes.link} to="/signup">
                    <Button className={classes.button} variant="contained" color="primary">Sign Up</Button>
                  </Link>
                </div>
              </div>
            )
        }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);
