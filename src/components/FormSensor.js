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
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import axios from 'axios';
import {
  createSensor,
  setAuthorized,
  loadSensorTypes,
} from '../actions/creator';
import useMachine from '../hooks/useMachine';
import { setSnackbar } from '../reducers/snackbarReducer';
import authHeader from '../service/auth-header';

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
  let machines = useSelector((state) => state.main.machines);
  const sensorTypes = useSelector((state) => state.main.sensorTypes);
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm();
  const [createdNewSensor, setCreatedNewSensor] = useState(false);

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

  const onSubmit = (data) => {
    console.log(data);
    const newSensor = { ...initialValues, ...data };
    console.log(newSensor.type);
    console.log(newSensor);
    reset({ ...initialValues });
    dispatch(createSensor(newSensor));
    setCreatedNewSensor(true);
    displayCreatedNewSensorNotification();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [createdNewSensor]);

  useEffect(() => {
    axios
      .get('/api/sensors/sensor-types', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadSensorTypes(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
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
          <BallotRoundedIcon />
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
