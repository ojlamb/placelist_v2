import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    color: 'white'
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  }
};

export class HeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.logOut = this.logOut.bind(this);
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logOut(event) {
    event.preventDefault();
    const { logOutUser } = this.props.actions;
    logOutUser();
    this.setState({ anchorEl: null });
    // this.props.history.push('/home');
  }

  render() {
    const { classes, session } = this.props;
    const open = Boolean(this.state.anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.flex}
            >
              <Link className={classes.link} to="/">
                PlaceList
              </Link>
            </Typography>
            { session.active ? (
              <div>
                <Link className={classes.link} to="/map">
                  <Button className={classes.button}>Map</Button>
                </Link>
                <Link className={classes.link} to="/places">
                  <Button className={classes.button} to="places">
                    List
                  </Button>
                </Link>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.logOut} to="/places">Log Out</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <div>
                  <Link className={classes.link} to="/login">
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link className={classes.link} to="/signup">
                    <Button className={classes.button}>Sign Up</Button>
                  </Link>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


HeaderView.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderView);
