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
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import momentTZ from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createMachine, setAuthorized } from '../actions/creator';
import { setSnackbar } from '../reducers/snackbarReducer';
import useMachine from '../hooks/useMachine';
import useSensor from '../hooks/useSensor';

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

export default function FormMachine() {
  const { fetchMachineTypes } = useMachine();
  const { fetchSensorsOnly } = useSensor();
  const dispatch = useDispatch();
  const timeZonesList = momentTZ.tz.names();
  // let structures = useSelector((state) => state.main.structures);
  const machineTypes = useSelector((state) => state.main.machineTypes);
  const sensorsList = useSelector((state) => state.main.sensors);
  let selectedMachineToEdit = useSelector(
    (state) => state.main.individualMachine
  );
  const classes = useStyles();
  const { handleSubmit, control, reset, setValue, clearErrors, register } =
    useForm();
  /*
  if (_.isEmpty(structures)) {
    const structuresData = localStorage.getItem('structures-data');
    structures = JSON.parse(structuresData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structures-data', JSON.stringify(structures));
  }
*/
  if (_.isEmpty(selectedMachineToEdit)) {
    const machineData = localStorage.getItem('machine-edit');
    selectedMachineToEdit = JSON.parse(machineData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('machine-edit', JSON.stringify(selectedMachineToEdit));
  }

  const initialValues = {
    name: '',
    config: {},
    isActive: false,
    description: '',
    alias: '',
    manufacturer: '',
    placeNumber: '',
    businessId: '',
    producedAt: null,
    launchedAt: '',
    lastMaintenancedAt: null,
    schedule: null,
    timezone: '',
    type: null,
    structure: null,
    sensors: [],
  };

  // SNACK BAR DELETE NOTIFICATION
  const displayCreatedNewMachineNotification = () => {
    dispatch(
      setSnackbar(true, 'success', 'New machine has been successfully created!')
    );
  };

  const onSubmit = (data, e) => {
    const newMachine = { ...initialValues, ...data };
    newMachine.isActive = data.isActive.statusValue;
    newMachine.sensors = [data.sensors];
    reset({ ...initialValues });
    e.target.reset();
    console.log(newMachine);
    // (createMachine(newMachine));
    displayCreatedNewMachineNotification();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMachineTypes();
    fetchSensorsOnly();
  }, []);

  const isActiveOptions = [
    {
      statusValue: true,
      statusLabel: 'Yes',
    },
    {
      statusValue: false,
      statusLabel: 'No',
    },
  ];

  console.log(selectedMachineToEdit);
  // console.log(structures);
  console.log(machineTypes);
  console.log(sensorsList);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar variant="rounded" className={classes.rounded}>
          <BallotRoundedIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          {selectedMachineToEdit ? 'Edit Machine' : 'Create New Machine'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="businessId"
                control={control}
                defaultValue={
                  selectedMachineToEdit ? selectedMachineToEdit.businessId : ''
                }
                render={({ field: { onChange, value } }) => (
                  <TextField
                    autoFocus
                    name="businessId"
                    variant="outlined"
                    fullWidth
                    id="businessId"
                    label="Business ID"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue={
                  selectedMachineToEdit ? selectedMachineToEdit.name : ''
                }
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    name="name"
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Machine Name"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Name is required' }}
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
                  <Autocomplete
                    options={isActiveOptions}
                    getOptionLabel={(option) => option.statusLabel}
                    onChange={(e, newValue) => {
                      if (newValue !== value) clearErrors('isActive');
                      setValue('isActive', newValue);
                    }}
                    value={value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Input"
                        name="isActive"
                        variant="outlined"
                        fullWidth
                        id="isActive"
                        label="Active"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                )}
                rules={{ required: 'Active status is required' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="description"
                    variant="outlined"
                    fullWidth
                    id="description"
                    label="Description"
                    value={value}
                    onChange={onChange}
                  />
                )}
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
                name="manufacturer"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="manufacturer"
                    variant="outlined"
                    fullWidth
                    id="manufacturer"
                    label="Manufacturer"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="placeNumber"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="placeNumber"
                    variant="outlined"
                    fullWidth
                    id="placeNumber"
                    label="Place Number"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="timezone"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    options={timeZonesList}
                    getOptionLabel={(option) => option}
                    onChange={(e, newValue) => {
                      if (newValue !== value) clearErrors('timezone');
                      setValue('timezone', newValue);
                    }}
                    value={value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Input"
                        name="timezone"
                        variant="outlined"
                        fullWidth
                        id="timezone"
                        label="Timezone"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                )}
                rules={{ required: 'Timezone is required' }}
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
                    options={machineTypes}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) => {
                      if (newValue !== value) clearErrors('type');
                      setValue('type', newValue);
                    }}
                    value={value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Input"
                        name="type"
                        variant="outlined"
                        fullWidth
                        id="type"
                        label="Machine type"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                )}
                rules={{ required: 'Machine type is required' }}
              />
            </Grid>
            {/*
            <Grid item xs={12}>
              <Controller
                name="structure"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    options={structures}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) => {
                      if (newValue !== value) clearErrors('structure');
                      setValue('structure', newValue);
                    }}
                    value={value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Input"
                        name="structure"
                        variant="outlined"
                        fullWidth
                        id="structure"
                        label="Structure"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                )}
                rules={{ required: 'Structure is required' }}
              />
            </Grid>
              */}
            <Grid item xs={12}>
              <Controller
                name="sensors"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    options={sensorsList}
                    getOptionLabel={(option) => option.sensorId}
                    onChange={(e, newValue) => {
                      if (newValue !== value) clearErrors('sensors');
                      setValue('sensors', newValue);
                    }}
                    value={value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Input"
                        name="sensors"
                        variant="outlined"
                        fullWidth
                        id="sensors"
                        label="Sensors"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                )}
                rules={{ required: 'Sensor is required' }}
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
