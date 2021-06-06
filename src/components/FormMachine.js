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

export default function FormStructure() {
  const dispatch = useDispatch();
  const timeZonesList = momentTZ.tz.names();
  let structures = useSelector((state) => state.main.structures);
  const machineTypes = useSelector((state) => state.main.machineTypes);
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm();
  const [structure, setStructure] = useState('5f0ec597ac1fd626e79f3468');
  const [timezone, setTimezone] = useState('Africa/Abidjan');
  const [machineType, setMachineType] = useState('5f0eeee5ac1fd626e79f34ed');
  const [createdNewMachine, setCreatedNewMachine] = useState(false);

  if (_.isEmpty(structures)) {
    const structuresData = localStorage.getItem('structures-data');
    structures = JSON.parse(structuresData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structures-data', JSON.stringify(structures));
  }

  const initialValues = {
    name: '',
    config: null,
    isActive: false,
    description: '',
    alias: '',
    manufacturer: '',
    placeNumber: '',
    businessId: '',
    producedAt: null,
    launchedAt: '',
    lastMaintenancedAt: null,
    schedule: '',
    timezone: '',
    type: null,
    structure: null,
    sensors: [],
    updatedAt: '',
    id: '',
    createdAt: '',
  };

  const handleChangeStructure = (event) => {
    setStructure(event.target.value);
  };

  const handleChangeTimezone = (event) => {
    setTimezone(event.target.value);
  };

  const handleChangeMachineType = (event) => {
    setMachineType(event.target.value);
  };

  // SNACK BAR DELETE NOTIFICATION
  const displayCreatedNewMachineNotification = () => {
    dispatch(
      setSnackbar(true, 'success', 'New machine has been successfully created!')
    );
  };

  const onSubmit = (data) => {
    const newMachine = { ...initialValues, ...data };
    newMachine.timezone = timezone;
    newMachine.structure = structure;
    const arrayMachineType = machineTypes.filter(
      (mType) => machineType === mType.id
    );
    newMachine.type = arrayMachineType.pop();
    console.log(newMachine.type);
    console.log(newMachine);
    reset({ ...initialValues });
    dispatch(createMachine(newMachine));
    setCreatedNewMachine(true);
    displayCreatedNewMachineNotification();
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
