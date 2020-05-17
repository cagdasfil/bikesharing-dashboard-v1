import React from "react";
import { Link } from 'react-router-dom';
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";

//icons
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
import MapIcon from "@material-ui/icons/Map"
import Person from "@material-ui/icons/Person"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StorageIcon from '@material-ui/icons/Storage';

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const [openManagement, setOpenManagement] = React.useState(null);
  const handleClickManagement = event => {
    if (openManagement && openManagement.contains(event.target)) {
      setOpenManagement(null);
    } else {
      setOpenManagement(event.currentTarget);
    }
  };
  const handleCloseManagement = () => {
    setOpenManagement(null);
  };
  const handleLogout = () => {
    //TODO
    console.log("logged-out")
  }
  const classes = useStyles();
  return (
    <div>

      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>

      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
        component={Link} to="/admin/dashboard"
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>


      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openManagement ? "management-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickManagement}
          className={classes.buttonLink}
        >
          <StorageIcon className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Management</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openManagement)}
          anchorEl={openManagement}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openManagement }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="management-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseManagement}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseManagement}
                      className={classes.dropdownItem}
                      component={Link} to="/admin/users"
                    >
                      Users
                    </MenuItem>

                    <MenuItem
                      onClick={handleCloseManagement}
                      className={classes.dropdownItem}
                      component={Link} to="/admin/bikes"
                    >
                      Bikes
                    </MenuItem>

                    <MenuItem
                      onClick={handleCloseManagement}
                      className={classes.dropdownItem}
                      component={Link} to="/admin/zones"
                    >
                      Zones
                    </MenuItem>
                    <Divider light />

                    <MenuItem
                      onClick={handleCloseManagement}
                      className={classes.dropdownItem}
                      component={Link} to="/admin/usages"
                    >
                      Usages
                    </MenuItem>

                    <MenuItem
                      onClick={handleCloseManagement}
                      className={classes.dropdownItem}
                      component={Link} to="/admin/payments"
                    >

                      Payments
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseManagement}
                      className={classes.dropdownItem}
                      component={Link} to="/admin/transactions"
                    >
                      Transactions
                    </MenuItem>
                    <Divider light />

                    <MenuItem
                      onClick={handleCloseManagement}
                      className={classes.dropdownItem}
                      component={Link} to="/admin/reports"
                    >
                      User Reports
                    </MenuItem>




                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>

      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Maps"
        className={classes.buttonLink}
        component={Link} to="/admin/map"
      >
        <MapIcon className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Maps</p>
        </Hidden>
      </Button>

      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Profile"
        className={classes.buttonLink}
        component={Link} to="/admin/profile"
      >
        <Person className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Admin Profile</p>
        </Hidden>
      </Button>

      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Logout"
        className={classes.buttonLink}
        onClick={handleLogout}
      >
        <ExitToAppIcon className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Logout</p>
        </Hidden>
      </Button>


    </div>
  );
}
