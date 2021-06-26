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
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import { createSensor, setAuthorized, clearData } from '../actions/creator';
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
  const { editSensor, fetchSensorTypes } = useSensor();
  let sensorTypes = useSelector((state) => state.main.sensorTypes);
  const classes = useStyles();
  const isEdit = useSelector((state) => state.main.edit);
  let selectedSensorToEdit = useSelector(
    (state) => state.main.individualSensor
  );

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
  };

  if (isEdit) {
    selectedSensorToEdit.isActive = selectedSensorToEdit.isActive
      ? {
          statusValue: true,
          statusLabel: 'Yes',
        }
      : {
          statusValue: false,
          statusLabel: 'No',
        };
  } else {
    selectedSensorToEdit = initialValues;
  }

  const { handleSubmit, control, reset, setValue, clearErrors } = useForm({
    defaultValues: selectedSensorToEdit,
  });

  if (_.isEmpty(sensorTypes)) {
    const sensorTypesData = localStorage.getItem('sensor-types-data');
    sensorTypes = JSON.parse(sensorTypesData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('sensor-types-data', JSON.stringify(sensorTypes));
  }

  // SNACK BAR CREATED NEW SENSOR NOTIFICATION
  const displayCreatedNewSensorNotification = () => {
    dispatch(
      setSnackbar(true, 'success', 'New sensor has been successfully created!')
    );
  };

  // SNACK BAR EDITED SENSOR NOTIFICATION
  const displayEditedSensorNotification = () => {
    dispatch(
      setSnackbar(true, 'success', 'Sensor has been successfully edited!')
    );
  };

  const onSubmit = (data, e) => {
    if (isEdit) {
      const editedSensor = { ...selectedSensorToEdit, ...data };
      editedSensor.isActive = data.isActive.statusValue;
      displayEditedSensorNotification();
      dispatch(clearData());
      console.log(editedSensor);
      dispatch(editSensor(editedSensor));
    } else {
      const newSensor = { ...initialValues, ...data };
      newSensor.isActive = data.isActive.statusValue;
      console.log(newSensor);
      dispatch(createSensor(newSensor));
      displayCreatedNewSensorNotification();
    }
    reset({ ...initialValues });
    e.target.reset();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSensorTypes();
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar variant="rounded" className={classes.rounded}>
          <ListAltIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          {isEdit ? 'Edit Sensor' : 'Create New Sensor'}
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
                  <Autocomplete
                    options={isActiveOptions}
                    getOptionLabel={(option) => option?.statusLabel}
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
                name="type"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    options={sensorTypes}
                    getOptionLabel={(option) => option?.name}
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
                        label="Sensor Type"
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
