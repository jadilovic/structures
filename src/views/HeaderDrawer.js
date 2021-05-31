import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorized } from "../actions/creator";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Header = (props) => {
  const { history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isAuthorized = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerCloseAfterSelection = (pageURL) => {
    handleDrawerClose();
    history.push(pageURL);
  };

  function logout() {
    localStorage.removeItem("user");
    dispatch(setAuthorized(false));
    history.push("/login");
  }

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      title: "Structures",
      pageURL: "/",
    },
    {
      title: "Create Structure",
      pageURL: "/form-structure",
    },
    {
      title: "Machines",
      pageURL: "/machines-table",
    },
    {
      title: "Create Machine",
      pageURL: "/form-machine",
    },
  ];

  if (isAuthorized) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {isMobile ? (
              <div style={{ flex: 1 }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  className={classes.drawer}
                  variant="persistent"
                  anchor="left"
                  open={open}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                      {theme.direction === "ltr" ? (
                        <ChevronLeftIcon />
                      ) : (
                        <ChevronRightIcon />
                      )}
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    {menuItems.map((item) => {
                      const { title, pageURL } = item;
                      return (
                        <ListItem
                          button
                          key={title}
                          onClick={() =>
                            handleDrawerCloseAfterSelection(pageURL)
                          }
                        >
                          <ListItemText primary={title} />
                        </ListItem>
                      );
                    })}
                  </List>
                  <Divider />
                </Drawer>
              </div>
            ) : (
              <>
                <Typography type="title" color="inherit">
                  Tika
                </Typography>
                <div className={classes.headerOptions}>
                  {menuItems.map((item) => {
                    console.log(item);
                    const { title, pageURL } = item;
                    return (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleButtonClick(pageURL)}
                      >
                        {title}
                      </Button>
                    );
                  })}
                </div>
              </>
            )}
            <div>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={logout}
              >
                LOGOUT
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              Welcome to Tika Technologies
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default withRouter(Header);
