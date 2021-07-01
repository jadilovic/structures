import React, { useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
  Switch,
} from '@material-ui/core';
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import momentTZ from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  changeEdit,
  clearData,
  createMachine,
  setAuthorized,
} from '../actions/creator';
import { setSnackbar } from '../reducers/snackbarReducer';
import useMachine from '../hooks/useMachine';
import useSensor from '../hooks/useSensor';
import useStructure from '../hooks/useStructure';

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
  const { fetchMachineTypes, editMachine } = useMachine();
  const { fetchSensorsOnly } = useSensor();
  const { fetchStructures } = useStructure();
  const dispatch = useDispatch();
  const timeZonesList = momentTZ.tz.names();
  let structures = useSelector((state) => state.main.structures);
  const machineTypes = useSelector((state) => state.main.machineTypes);
  const sensorsList = useSelector((state) => state.main.sensors);
  const isEdit = useSelector((state) => state.main.edit);
  let selectedMachineToEdit = useSelector(
    (state) => state.main.individualMachine
  );
  const classes = useStyles();

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

  if (isEdit) {
    selectedMachineToEdit.sensors = [{ ...selectedMachineToEdit.sensors[0] }];
  } else {
    selectedMachineToEdit = initialValues;
  }

  const { handleSubmit, control, reset, setValue, clearErrors } = useForm({
    defaultValues: selectedMachineToEdit,
  });

  if (_.isEmpty(structures)) {
    const structuresData = localStorage.getItem('structures-data');
    structures = JSON.parse(structuresData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structures-data', JSON.stringify(structures));
  }

  // SNACK BAR CREATED NOTIFICATION
  const displayCreatedNewMachineNotification = () => {
    dispatch(
      setSnackbar(true, 'success', 'New machine has been successfully created!')
    );
  };

  // SNACK BAR EDITED NOTIFICATION
  const displayEditedMachineNotification = () => {
    dispatch(
      setSnackbar(true, 'success', 'Machine has been successfully edited!')
    );
  };

  const onSubmit = (data, e) => {
    if (isEdit) {
      const editedMachine = { ...selectedMachineToEdit, ...data };
      editedMachine.sensors = data.sensors;
      displayEditedMachineNotification();
      dispatch(clearData());
      dispatch(editMachine(editedMachine));
    } else {
      const newMachine = { ...initialValues, ...data };
      newMachine.sensors = data.sensors;
      dispatch(createMachine(newMachine));
      displayCreatedNewMachineNotification();
    }
    reset({ ...initialValues });
    e.target.reset();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMachineTypes();
    fetchSensorsOnly();
    fetchStructures();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar variant="rounded" className={classes.rounded}>
          <BallotRoundedIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          {isEdit ? 'Edit Machine' : 'Create New Machine'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="businessId"
                control={control}
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
            <Grid justify="center" item xs={12}>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Typography align="center" component="div">
                    <Grid
                      justify="center"
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>Not Active</Grid>
                      <Grid justify="center" item>
                        <Switch
                          color="primary"
                          onChange={(e) => field.onChange(e.target.checked)}
                          checked={field.value}
                        />
                      </Grid>
                      <Grid item>Active</Grid>
                    </Grid>
                  </Typography>
                )}
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
                render={({ field: { value }, fieldState: { error } }) => (
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
                render={({ field: { value }, fieldState: { error } }) => (
                  <Autocomplete
                    options={machineTypes}
                    getOptionLabel={(option) => option?.name}
                    onChange={(e, newValue) => {
                      if (newValue !== value) clearErrors('type');
                      setValue('type', newValue);
                    }}
                    value={value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
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
            <Grid item xs={12}>
              <Controller
                name="structure"
                control={control}
                defaultValue=""
                render={({ field: { value }, fieldState: { error } }) => (
                  <Autocomplete
                    options={structures}
                    getOptionLabel={(option) => option?.name}
                    onChange={(e, newValue) => {
                      if (newValue !== value) clearErrors('structure');
                      setValue('structure', newValue);
                    }}
                    value={value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
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
            <Grid item xs={12}>
              <Controller
                name="sensors"
                control={control}
                defaultValue=""
                render={({ field: { value }, fieldState: { error } }) => (
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={sensorsList}
                    getOptionLabel={(option) => option.sensorId}
                    onChange={(e, newValue) => {
                      if (newValue !== value) clearErrors('sensors');
                      setValue('sensors', newValue);
                    }}
                    value={value}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
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
            {isEdit ? 'Save' : 'Submit'}
          </Button>
        </form>
      </div>
    </Container>
  );
}
