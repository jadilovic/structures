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
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  createMachine,
  setAuthorized,
  loadMachineTypes,
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

export default function FormMachine() {
  const dispatch = useDispatch();
  const timeZonesList = momentTZ.tz.names();
  let structures = useSelector((state) => state.main.structures);
  const machineTypes = useSelector((state) => state.main.machineTypes);
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm();
  const [structure, setStructure] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [machineType, setMachineType] = useState(null);
  const [createdNewMachine, setCreatedNewMachine] = useState(false);
  const [error, setError] = useState(false);
  const [errorStructure, setErrorStructure] = useState(false);
  const [errorMachineType, setErrorMachineType] = useState(false);

  if (_.isEmpty(structures)) {
    const structuresData = localStorage.getItem('structures-data');
    structures = JSON.parse(structuresData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structures-data', JSON.stringify(structures));
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
    // updatedAt: '',
    // id: '',
    // createdAt: '',
  };

  const handleChangeStructure = (value) => {
    setErrorStructure(false);
    setStructure(value);
  };

  const handleChangeTimezone = (value) => {
    setError(false);
    setTimezone(value);
  };

  const handleChangeMachineType = (value) => {
    console.log(value);
    setErrorMachineType(false);
    setMachineType(value);
  };

  // SNACK BAR DELETE NOTIFICATION
  const displayCreatedNewMachineNotification = () => {
    dispatch(
      setSnackbar(true, 'success', 'New machine has been successfully created!')
    );
  };

  const onSubmit = (data) => {
    const newMachine = { ...initialValues, ...data };

    if (!timezone) {
      setError(true);
      return;
    }

    if (!structure) {
      setErrorStructure(true);
      return;
    }

    if (!machineType) {
      setErrorMachineType(true);
      return;
    }

    newMachine.timezone = timezone;

    const arrayStructure = structures.filter(
      (selectedStructure) => structure === selectedStructure.name
    );
    newMachine.structure = arrayStructure.pop();

    const arrayMachineType = machineTypes.filter(
      (mType) => machineType === mType.name
    );
    newMachine.type = arrayMachineType.pop();

    reset({ ...initialValues, timezone });
    dispatch(createMachine(newMachine));
    setCreatedNewMachine(true);
    displayCreatedNewMachineNotification();
    window.location.reload(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [createdNewMachine]);

  useEffect(() => {
    axios
      .get('/api/machines/machine-types', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadMachineTypes(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }, []);

  const stringStructures = structures.map((structure) => structure.name);
  const stringMachineTypes = machineTypes.map((type) => type.name);

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
              <Autocomplete
                options={timeZonesList}
                style={{ width: '100%' }}
                onChange={(event, value) => handleChangeTimezone(value)}
                onInputChange={() => {
                  setError(false);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    error={error}
                    id="outlined-error-helper-text"
                    label={error ? 'Select timezone' : 'Select timezone'}
                    helperText={error ? 'Timezone is required.' : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={stringStructures}
                style={{ width: '100%' }}
                onChange={(event, value) => handleChangeStructure(value)}
                onInputChange={() => {
                  setErrorStructure(false);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    error={errorStructure}
                    id="outlined-error-helper-text"
                    label={
                      errorStructure ? 'Select structure' : 'Select structure'
                    }
                    helperText={errorStructure ? 'Structure is required.' : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={stringMachineTypes}
                style={{ width: '100%' }}
                onChange={(event, value) => handleChangeMachineType(value)}
                onInputChange={() => {
                  setErrorMachineType(false);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    error={errorMachineType}
                    id="outlined-error-helper-text"
                    label={
                      errorMachineType
                        ? 'Select machine type'
                        : 'Select machine type'
                    }
                    helperText={
                      errorStructure ? 'Machine type is required.' : ''
                    }
                  />
                )}
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
