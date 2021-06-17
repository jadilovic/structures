import React, { useState } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Button,
  Card,
  CardActions,
  CardActionArea,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { setAuthorized, clearData, deleteSensor } from '../actions/creator';
import ConfirmDialog from './ConfirmDialog';
import useMachine from '../hooks/useMachine';
import { setSnackbar } from '../reducers/snackbarReducer';

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

// UNDER CONSTRUCTION
export default function IndividualSensorDisplay() {
  const { fetchMachineById } = useMachine();
  let sensor = useSelector((state) => state.main.individualSensor);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (_.isEmpty(sensor)) {
    const sensorData = localStorage.getItem('sensor-data');
    sensor = JSON.parse(sensorData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('sensor-data', JSON.stringify(sensor));
  }

  function displaySensorMachine(machine) {
    fetchMachineById(machine.id);
  }

  // SNACK BAR DELETE NOTIFICATION
  const displayDeleteNotification = () => {
    dispatch(
      setSnackbar(
        true,
        'success',
        'Selected sensor has been successfully deleted!'
      )
    );
    history.push('/sensors-table');
  };

  function deleteIndividualSensor(sensorId) {
    dispatch(clearData());
    dispatch(deleteSensor(sensorId));
    displayDeleteNotification();
  }

  const machineInSensor = sensor.machine ? sensor.machine : {};

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Sensor ID:
                </TableCell>
                <TableCell>{sensor.sensorId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Active:
                </TableCell>
                <TableCell>{`${sensor.isActive ? 'Yes' : 'No'}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Alias:
                </TableCell>
                <TableCell>{sensor.alias}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Sensor Type:
                </TableCell>
                <TableCell>{sensor.type.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Machine:
                </TableCell>
                <TableCell>
                  {sensor?.machine?.name ?? 'This sensor has NO machine'}
                </TableCell>
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
            Delete Sensor
          </Button>
          <ConfirmDialog
            title="Delete Sensor?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={() => deleteIndividualSensor(sensor.id)}
          >
            Are you sure you want to delete this sensor?
          </ConfirmDialog>
        </div>
      </Grid>
      <Grid item xs={6}>
        <Card className={classes.root}>
          <CardActionArea
            onClick={() => {
              displaySensorMachine(machineInSensor);
            }}
          >
            <CardActions>
              <Button
                fullWidth
                color="primary"
                onClick={() => {
                  displaySensorMachine(machineInSensor);
                }}
              >
                {machineInSensor ? 'Go to machine' : ''}
              </Button>
            </CardActions>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Status:
                    </TableCell>
                    <TableCell>
                      {machineInSensor?.isActive ? 'Active' : 'Not Active'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Alias:
                    </TableCell>
                    <TableCell>{machineInSensor?.alias}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Machine Type:
                    </TableCell>
                    <TableCell>{machineInSensor?.type?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Business ID:
                    </TableCell>
                    <TableCell>{machineInSensor?.businessId}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
