import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Switch,
  Menu,
  MenuItem,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorized } from "../actions/creator";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly",
  },
}));

const Header = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isAuthorized = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();

  function logout() {
    localStorage.removeItem("user");
    dispatch(setAuthorized(false));
    history.push("/login");
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleMenuClick("/")}>
                  Structures
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/form-structure")}>
                  Create Structure
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/machines-table")}>
                  Machines
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div className={classes.headerOptions}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick("/")}
              >
                Structures
              </Button>
              <Button
                variant="contained"
                onClick={() => handleButtonClick("/form-structure")}
              >
                Create Structure
              </Button>
              <Button
                variant="contained"
                onClick={() => handleButtonClick("/machines-table")}
              >
                Machines
              </Button>
            </div>
          )}
          {isAuthorized && (
            <Button variant="contained" color="secondary" onClick={logout}>
              LOGOUT
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
