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
import { setAuthorized } from '../actions/creator';
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

export default function UpdateStructure() {
  const timeZonesList = momentTZ.tz.names();
  const { fetchStructuresOnly, updateStructure } = useStructure();
  const dispatch = useDispatch();
  let structures = useSelector((state) => state.main.structures);
  let structureUpdate = useSelector((state) => state.main.individualStructure);

  const classes = useStyles();
  const { handleSubmit, control, setValue } = useForm();

  if (_.isEmpty(structures)) {
    const structuresData = localStorage.getItem('structures-data');
    structures = JSON.parse(structuresData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structures-data', JSON.stringify(structures));
  }

  if (_.isEmpty(structureUpdate)) {
    const structureData = localStorage.getItem('structure-update');
    structureUpdate = JSON.parse(structureData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structure-update', JSON.stringify(structureUpdate));
  }

  // SNACK BAR UPDATE NOTIFICATION
  const displayUpdatedStructureNotification = () => {
    dispatch(
      setSnackbar(
        true,
        'success',
        'The structure has been successfully updated!'
      )
    );
  };

  const onSubmit = (data, e) => {
    const newStructureUpdate = { ...structureUpdate, ...data };
    updateStructure(newStructureUpdate);
    displayUpdatedStructureNotification();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStructuresOnly();
  }, []);

  console.log(structureUpdate);

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
          <AssignmentIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          Update Existing Structure
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="businessId"
                control={control}
                defaultValue={setValue(
                  'businessId',
                  structureUpdate.businessId
                )}
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
                defaultValue={setValue('name', structureUpdate.name)}
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
                defaultValue={setValue(
                  'description',
                  structureUpdate.description
                )}
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
                defaultValue={setValue('city', structureUpdate.city)}
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
                defaultValue={setValue('country', structureUpdate.country)}
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
                defaultValue={setValue('timezone', structureUpdate.timezone)}
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
                defaultValue={setValue('structure', structureUpdate.structure)}
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
            <Grid item xs={12}>
              <Controller
                name="isActive"
                control={control}
                defaultValue={setValue('isActive', structureUpdate.isActive)}
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
