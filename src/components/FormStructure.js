import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AssignmentIcon from "@material-ui/icons/Assignment";
import momentTZ from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import { createStructure, setAuthorized } from "../actions/creator";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  rounded: {
    color: "#fff",
    backgroundColor: "green",
  },
}));

export default function FormStructure() {
  const timeZonesList = momentTZ.tz.names();
  const dispatch = useDispatch();
  let structures = useSelector((state) => state.main.structures);
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [structure, setStructure] = useState("");
  const [timezone, setTimezone] = useState("");

  if (_.isEmpty(structures)) {
    const structuresData = localStorage.getItem("structures-data");
    structures = JSON.parse(structuresData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem("structures-data", JSON.stringify(structures));
  }

  const initialValues = {
    businessId: "",
    name: "",
    description: "",
    city: "",
    country: "",
    timezone: "",
    isActive: false,
    sortIndex: 0,
    structure: null,
    structures: [],
    machines: [],
  };

  const handleChangeStructure = (event) => {
    setStructure(event.target.value);
  };

  const handleChangeTimezone = (event) => {
    setTimezone(event.target.value);
  };

  const onSubmit = (data) => {
    const newStructure = { ...initialValues, ...data };
    newStructure.timezone = timezone;
    if (structure !== "") {
      newStructure.structure = structure;
    }
    console.log(newStructure);
    reset({ ...initialValues });
    dispatch(createStructure(newStructure));
    setSubmitted(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  }, [submitted]);

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
        {submitted && (
          <Alert severity="success">New Structure Was Created</Alert>
        )}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="businessId"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="businessId"
                    variant="outlined"
                    fullWidth
                    id="businessId"
                    label="Business ID"
                    value={value}
                    onChange={onChange}
                    autoFocus
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
                rules={{ required: "Name is required" }}
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
                rules={{ required: "City is required" }}
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
                rules={{ required: "Country is required" }}
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
                <option value="">{timeZonesList[0]}</option>
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
                helperText="Please select parent structure"
                variant="outlined"
              >
                <option value="">No parent structure</option>
                {structures.map((option) => (
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
