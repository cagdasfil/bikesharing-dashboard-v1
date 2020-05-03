/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
//@material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'

//icons
import Icon from "@material-ui/core/Icon";
import StorageIcon from '@material-ui/icons/Storage';
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'

//core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";

//asset style
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {

  const [isManagementOpen, setManagementOpen] = React.useState(false)
  function handleStudentClick() {
    setManagementOpen(!isManagementOpen)
  }

  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;

  var listItemClasses;
  var whiteFontClasses;
  var nestedItemLink;


  const links = (parent) => {
    return (
      routes.map((prop, key) => {
        if (prop.childOf === parent) {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });

          whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
          });
          nestedItemLink = " ";
          if (prop.isNested)
            nestedItemLink = nestedItemLink + classes.nestedItem;
          return (
            <NavLink
              to={prop.layout + prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses + nestedItemLink}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                    <prop.icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    />
                  )}
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses)}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        }
      })
    );
  }
  var dashboardLink = links('Dashboard')
  var ManagementLinks = links('Management')
  var otherLinks = links('Yourself')
  var brand = (
    <div className={classes.logo}>
      <a
        href="https://aykutyrdm.github.io/bikesharing-intro-web-site/"
        className={classNames(classes.logoLink)}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <List className={classes.list}>
              {dashboardLink}
              <ListItem button onClick={handleStudentClick} className={classes.itemLink}>
                <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>
                  <StorageIcon />
                </Icon>
                <ListItemText primary="Management" className={classNames(classes.itemText, whiteFontClasses)} disableTypography={true} />

                {isManagementOpen
                  ? <IconExpandLess className={classNames(classes.itemIcon, whiteFontClasses)} />
                  : <IconExpandMore className={classNames(classes.itemIcon, whiteFontClasses)} />}

              </ListItem>
              <Collapse in={isManagementOpen} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding> {ManagementLinks}
                </List>
              </Collapse>
              {otherLinks}
            </List>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
