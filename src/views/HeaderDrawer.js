/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import clsx from 'clsx';
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
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import MachinesIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import SensorsIcon from '@material-ui/icons/DeviceHub';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  faIndustry,
  faFolderPlus,
  faCalendarPlus,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, Switch, Route } from 'react-router-dom';
import { clearData, setAuthorized } from '../actions/creator';
import StructuresTable from '../components/StructuresTable';
import FormStructure from '../components/FormStructure';
import FormMachine from '../components/FormMachine';
import MachinesTable from '../components/MachinesTable';
import IndividualStructure from '../components/IndividualStructure';
import IndividualMachine from '../components/IndividualMachine';
import SensorsTable from '../components/SensorsTable';
import IndividualSensor from '../components/IndividualSensor';
import Login from './Login';
import Error from './Error';
import PrivateRoute from '../components/PrivateRoute';
import FormSensor from '../components/FormSensor';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('xs')]: {
      width: theme.spacing.unit * 7,
    },
    [theme.breakpoints.down('xs')]: {
      width: 0,
      display: 'none',
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  icons: {
    paddingRight: '5px',
    fontSize: '30px',
    color: 'rgb(0, 123, 255)',
  },
}));
const HeaderDrawer = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isAuthorized = localStorage.getItem('user');

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
    localStorage.removeItem('user');
    dispatch(setAuthorized(false));
    dispatch(clearData());
    history.push('/login');
  }

  const menuItems = [
    {
      title: 'Structures',
      pageURL: '/',
      icon: <FontAwesomeIcon icon={faIndustry} className={classes.icons} />,
    },
    {
      title: 'Create Structure',
      pageURL: '/form-structure',
      icon: <FontAwesomeIcon icon={faFolderPlus} className={classes.icons} />,
    },
    {
      title: 'Machines',
      pageURL: '/machines-table',
      icon: (
        <MachinesIcon
          style={{
            fontSize: '35px',
            paddingRight: '7px',
            color: 'rgb(0, 123, 255)',
          }}
        />
      ),
    },
    {
      title: 'Create Machine',
      pageURL: '/form-machine',
      icon: <FontAwesomeIcon icon={faPlusSquare} className={classes.icons} />,
    },
    {
      title: 'Sensors',
      pageURL: '/sensors-table',
      icon: <SensorsIcon className={classes.icons} />,
    },
    {
      title: 'Create Sensor',
      pageURL: '/form-sensor',
      icon: <FontAwesomeIcon icon={faCalendarPlus} className={classes.icons} />,
    },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => {
        const { title, pageURL, icon } = item;
        return (
          <>
            <ListItem
              button
              key={title}
              onClick={() => handleDrawerCloseAfterSelection(pageURL)}
            >
              <ListItemIcon> {icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );

  const toggleDrawer = (
    <div>
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
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {drawer}
      </Drawer>
    </div>
  );

  if (isAuthorized) {
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
        {toggleDrawer}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <PrivateRoute component={StructuresTable} path="/" exact />
            <PrivateRoute
              component={FormStructure}
              path="/form-structure"
              exact
            />
            <PrivateRoute component={FormMachine} path="/form-machine" exact />
            <PrivateRoute
              component={MachinesTable}
              path="/machines-table"
              exact
            />
            <PrivateRoute
              component={SensorsTable}
              path="/sensors-table"
              exact
            />
            <PrivateRoute
              component={IndividualStructure}
              path="/individual-structure"
              exact
            />
            <PrivateRoute
              component={IndividualMachine}
              path="/individual-machine"
              exact
            />
            <PrivateRoute
              component={IndividualSensor}
              path="/individual-sensor"
              exact
            />
            <PrivateRoute component={FormSensor} path="/form-sensor" exact />
            <Route component={Login} path="/login" />
            <Route component={Error} path="*" />
          </Switch>
        </main>
      </div>
    );
  }
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
          <Typography variant="h6" noWrap>
            Welcome to Tika Technologies
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Error} path="*" />
        </Switch>
      </main>
    </div>
  );
};

export default withRouter(HeaderDrawer);
