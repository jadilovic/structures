import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Button,
  Container,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { setAuthorized } from "../actions/creator";
import { useDispatch, useSelector } from "react-redux";
import StructuresIcon from "@material-ui/icons/AccountBalanceOutlined";
import CreateStructureIcon from "@material-ui/icons/BuildOutlined";
import MachinesIcon from "@material-ui/icons/SettingsApplicationsOutlined";
import CreateMachineIcon from "@material-ui/icons/GavelOutlined";
import StructuresTable from "../components/StructuresTable";
import FormStructure from "../components/FormStructure";
import MachinesTable from "../components/MachinesTable";
import IndividualStructure from "../components/IndividualStructure";
import IndividualMachine from "../components/IndividualMachine";
import { Login, Error } from "../views";
import { withRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbarButtons: {
    marginLeft: "auto",
  },
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const HeaderDrawer = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isAuthorized = useSelector((state) => state.isAuth);

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

  const menuItems = [
    {
      title: "Structures",
      pageURL: "/",
      icon: <StructuresIcon />,
    },
    {
      title: "Create Structure",
      pageURL: "/form-structure",
      icon: <CreateStructureIcon />,
    },
    {
      title: "Machines",
      pageURL: "/machines-table",
      icon: <MachinesIcon />,
    },
    {
      title: "Create Machine",
      pageURL: "/form-machine",
      icon: <CreateMachineIcon />,
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Tika Technologies
          </Typography>
          <div className={classes.toolbarButtons}>
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
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((item) => {
            const { title, pageURL, icon } = item;
            return (
              <ListItem
                button
                key={title}
                onClick={() => handleDrawerCloseAfterSelection(pageURL)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <PrivateRoute
            component={StructuresTable}
            path="/"
            exact={true}
          ></PrivateRoute>
          <PrivateRoute
            component={FormStructure}
            path="/form-structure"
            exact={true}
          ></PrivateRoute>
          <PrivateRoute path="/machines-table" exact={true}>
            <MachinesTable />
          </PrivateRoute>
          <PrivateRoute path="/individual-structure" exact={true}>
            <IndividualStructure />
          </PrivateRoute>
          <PrivateRoute path="/individual-machine" exact={true}>
            <IndividualMachine />
          </PrivateRoute>
          <Route path="*" component={Error}></Route>
        </Switch>
      </main>
    </div>
  );
};

export default withRouter(HeaderDrawer);
