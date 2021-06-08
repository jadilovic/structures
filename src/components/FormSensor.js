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
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import axios from 'axios';
import {
  createSensor,
  setAuthorized,
  loadSensorTypes,
} from '../actions/creator';
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
  let machines = useSelector((state) => state.main.machines);
  const sensorTypes = useSelector((state) => state.main.sensorTypes);
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm();
  const [machine, setMachine] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [sensorType, setSensorType] = useState('');
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

  const handleChangeMachine = (event) => {
    setMachine(event.target.value);
  };

  const handleChangeIsActive = (event) => {
    setIsActive(event.target.value);
  };

  const handleChangeSensorType = (event) => {
    setSensorType(event.target.value);
  };

  // SNACK BAR DELETE NOTIFICATION
  const displayCreatedNewSensorNotification = () => {
    dispatch(
      setSnackbar(true, 'success', 'New sensor has been successfully created!')
    );
  };

  const onSubmit = (data) => {
    const newSensor = { ...initialValues, ...data };
    newSensor.isActive = isActive;
    newSensor.machine = machine;
    const arraySensorType = sensorTypes.filter(
      (sType) => sensorType === sType.id
    );
    newSensor.type = arraySensorType.pop();
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
      .get('/api/machines/machine-types', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadMachineTypes(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar variant="rounded" className={classes.rounded}>
          <BallotRoundedIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          Create New Machine
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="businessId"
                control={control}
                defaultValue=""
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
                defaultValue=""
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
              <TextField
                id="outlined-select-currency-native"
                fullWidth
                select
                value={timezone}
                onChange={handleChangeTimezone}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select timezone"
                variant="outlined"
              >
                {timeZonesList.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency-native"
                fullWidth
                select
                value={structure}
                onChange={handleChangeStructure}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select structure"
                variant="outlined"
              >
                {structures.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency-native"
                fullWidth
                select
                value={machineType}
                onChange={handleChangeMachineType}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select machine type"
                variant="outlined"
              >
                {machineTypes.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
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
