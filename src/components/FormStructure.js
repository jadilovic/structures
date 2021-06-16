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
import AssignmentIcon from '@material-ui/icons/Assignment';
import momentTZ from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStructure, setAuthorized } from '../actions/creator';
import { setSnackbar } from '../reducers/snackbarReducer';
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

export default function FormStructure() {
  const timeZonesList = momentTZ.tz.names();
  const { fetchStructuresOnly } = useStructure();
  const dispatch = useDispatch();
  let structures = useSelector((state) => state.main.structures);
  const classes = useStyles();
  const { handleSubmit, control, reset, setValue } = useForm();

  if (_.isEmpty(structures)) {
    const structuresData = localStorage.getItem('structures-data');
    structures = JSON.parse(structuresData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structures-data', JSON.stringify(structures));
  }

  const initialValues = {
    businessId: '',
    name: '',
    description: '',
    city: '',
    country: '',
    timezone: '',
    isActive: false,
    sortIndex: 0,
    structure: null,
    structures: [],
    machines: [],
  };

  // SNACK BAR DELETE NOTIFICATION
  const displayCreatedNewStructureNotification = () => {
    dispatch(
      setSnackbar(
        true,
        'success',
        'New structure has been successfully created!'
      )
    );
  };

  const onSubmit = (data, e) => {
    const newStructure = { ...initialValues, ...data };
    reset({ ...initialValues });
    e.target.reset();
    dispatch(createStructure(newStructure));
    displayCreatedNewStructureNotification();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStructuresOnly();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar variant="rounded" className={classes.rounded}>
          <AssignmentIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          Create New Structure
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
                    label="Structure Name"
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
                name="city"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    name="city"
                    variant="outlined"
                    fullWidth
                    id="city"
                    label="City"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'City is required' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    placeholder="Input"
                    name="country"
                    variant="outlined"
                    fullWidth
                    id="country"
                    label="Country"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Country is required' }}
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
                      setValue('timezone', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Input"
                        name="timezone"
                        variant="outlined"
                        fullWidth
                        id="timezone"
                        label="Timezone"
                        value={value}
                        onChange={onChange}
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
                name="structure"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={structures}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) => {
                      setValue('structure', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Input"
                        name="structure"
                        variant="outlined"
                        fullWidth
                        id="structure"
                        label="Structure"
                        value={value}
                        onChange={onChange}
                      />
                    )}
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
