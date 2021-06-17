import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import { createSensor, setAuthorized } from '../actions/creator';
import useMachine from '../hooks/useMachine';
import useSensor from '../hooks/useSensor';
import { setSnackbar } from '../reducers/snackbarReducer';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  rounded: {
    color: '#fff',
    backgroundColor: 'green',
  },
}));

export default function FormSensor() {
  const dispatch = useDispatch();
  const { fetchMachinesOnly } = useMachine();
  const { fetchSensorTypes } = useSensor();
  let machines = useSelector((state) => state.main.machines);
  const sensorTypes = useSelector((state) => state.main.sensorTypes);
  const classes = useStyles();
  const { handleSubmit, control, reset, setValue } = useForm();

  if (_.isEmpty(machines)) {
    const structuresData = localStorage.getItem('machines-data');
    machines = JSON.parse(structuresData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('machines-data', JSON.stringify(machines));
  }

  const initialValues = {
    sensorId: '',
    isActive: false,
    alias: '',
    lastSeenAt: null,
    registeredAt: null,
    type: null,
    rssi: 0,
    ssid: '',
    version: '',
    module: '',
    machine: null,
  };

  // SNACK BAR DELETE NOTIFICATION
  const displayCreatedNewSensorNotification = () => {
    dispatch(
      setSnackbar(true, 'success', 'New sensor has been successfully created!')
    );
  };

  const onSubmit = (data, e) => {
    console.log(data);
    const newSensor = { ...initialValues, ...data };
    console.log(newSensor.type);
    console.log(newSensor.machine);
    reset({ ...initialValues });
    e.target.reset();
    dispatch(createSensor(newSensor));
    displayCreatedNewSensorNotification();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSensorTypes();
    fetchMachinesOnly();
  }, []);

  const active = [
    {},
    {
      value: true,
      label: 'Yes',
    },
    {
      value: false,
      label: 'No',
    },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar variant="rounded" className={classes.rounded}>
          <ListAltIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          Create New Sensor
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="sensorId"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    autoFocus
                    name="sensorId"
                    variant="outlined"
                    fullWidth
                    id="sensorId"
                    label="Sensor ID"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Sensor ID is required' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="isActive"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    name="isActive"
                    variant="outlined"
                    fullWidth
                    id="isActive"
                    select
                    label="Active"
                    value={value}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  >
                    {active.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                )}
                rules={{ required: 'Active is required' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    options={sensorTypes}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) => {
                      setValue('type', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Input"
                        name="type"
                        variant="outlined"
                        fullWidth
                        id="type"
                        label="Sensor Type"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                )}
                rules={{ required: 'Sensor type is required' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="alias"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="alias"
                    variant="outlined"
                    fullWidth
                    id="alias"
                    label="Alias"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="machine"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    options={machines}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) => {
                      setValue('machine', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Input"
                        name="machine"
                        variant="outlined"
                        fullWidth
                        id="machine"
                        label="Machine"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                )}
                rules={{ required: 'Machine is required' }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
