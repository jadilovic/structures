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
import AssignmentIcon from '@material-ui/icons/Assignment';
import momentTZ from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  createStructure,
  setAuthorized,
  clearData,
  loadStructures,
} from '../actions/creator';
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
  const { fetchStructures, editStructure } = useStructure();
  const dispatch = useDispatch();
  let structures = useSelector((state) => state.main.structures);
  const isEdit = useSelector((state) => state.main.edit);
  let selectedStructureToEdit = useSelector(
    (state) => state.main.individualStructure
  );
  const classes = useStyles();

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

  if (!isEdit) {
    selectedStructureToEdit = initialValues;
  }

  const { handleSubmit, control, reset, setValue, clearErrors } = useForm({
    defaultValues: selectedStructureToEdit,
  });

  if (_.isEmpty(structures)) {
    const structuresData = localStorage.getItem('structures-data');
    structures = JSON.parse(structuresData);
    dispatch(loadStructures(structuresData));
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structures-data', JSON.stringify(structures));
  }

  // SNACK BAR NEW STRUCTURE NOTIFICATION
  const displayCreatedNewStructureNotification = () => {
    dispatch(
      setSnackbar(
        true,
        'success',
        'New structure has been successfully created!'
      )
    );
  };

  // SNACK BAR EDITED STRUCTURE NOTIFICATION
  const displayEditedStructureNotification = () => {
    dispatch(
      setSnackbar(
        true,
        'success',
        'Selected structure has been successfully edited!'
      )
    );
  };

  const onSubmit = (data, e) => {
    if (isEdit) {
      const editedStructure = { ...selectedStructureToEdit, ...data };
      displayEditedStructureNotification();
      dispatch(editStructure(editedStructure));
    } else {
      const newStructure = { ...initialValues, ...data };
      dispatch(createStructure(newStructure));
      displayCreatedNewStructureNotification();
    }
    reset({ ...initialValues });
    e.target.reset();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStructures();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar variant="rounded" className={classes.rounded}>
          <AssignmentIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          {isEdit ? 'Edit Structure' : 'Create New Structure'}
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
                name="structure"
                control={control}
                defaultValue=""
                render={({ field: { value } }) => (
                  <Autocomplete
                    options={structures}
                    getOptionLabel={(option) => option?.name}
                    onChange={(e, newValue) => {
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
                      />
                    )}
                  />
                )}
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
