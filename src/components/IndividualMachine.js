import React, { useState } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  Snackbar,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import _ from 'lodash';
import {
  setAuthorized,
  displaySensor,
  deleteMachine,
  clearData,
} from '../actions/creator';
import ConfirmDialog from './ConfirmDialog';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  row: {
    cursor: 'pointer',
  },
}));

export default function IndividualMachineDisplay() {
  let machine = useSelector((state) => state.main.individualMachine);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [openDeleteNotification, setOpenDeleteNotification] = useState(false);

  const displayDeleteNotification = () => {
    setOpenDeleteNotification(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDeleteNotification(false);
    history.push('/machines-table');
  };

  if (_.isEmpty(machine)) {
    const machineData = localStorage.getItem('machine-data');
    machine = JSON.parse(machineData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('machine-data', JSON.stringify(machine));
  }

  function deleteIndividualMachine(machineId) {
    dispatch(clearData());
    dispatch(deleteMachine(machineId));
    displayDeleteNotification();
  }

  function displaySensorRow(data) {
    dispatch(displaySensor(data));
    history.push('/individual-sensor');
  }

  return (
    <Grid container spacing={3}>
      {openDeleteNotification && (
        <div className={classes.root}>
          <Snackbar
            open={openDeleteNotification}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              You have successfuly deleted selected machine! You will now be
              returned to the Machines page.
            </Alert>
          </Snackbar>
        </div>
      )}
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name:
                </TableCell>
                <TableCell>{machine.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Active:
                </TableCell>
                <TableCell>{`${machine.isActive ? 'Yes' : 'No'}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Business ID:
                </TableCell>
                <TableCell>{machine.businessId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Description:
                </TableCell>
                <TableCell>{machine.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Alias:
                </TableCell>
                <TableCell>{machine.alias}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Button
            aria-label="delete"
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => setConfirmOpen(true)}
          >
            Delete Machine
          </Button>
          <ConfirmDialog
            title="Delete Machine?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={() => deleteIndividualMachine(machine.id)}
          >
            Are you sure you want to delete this machine?
          </ConfirmDialog>
        </div>
      </Grid>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell variant="head">Sensors:</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>Alias:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {machine.sensors.map((sensor) => (
                <TableRow
                  key={sensor.id}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    displaySensorRow(sensor);
                  }}
                  align="center"
                  className={classes.row}
                >
                  <TableCell>{sensor.sensorId}</TableCell>
                  <TableCell>{sensor.alias}</TableCell>
                </TableRow>
              ))}
              {machine.sensors.length > 0 ? null : 'No Sensors in the Machine'}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
