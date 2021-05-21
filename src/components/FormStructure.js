import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { FormControl, FormHelperText, MenuItem } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { green } from "@material-ui/core/colors";
import { createStructure } from "../actions/creator";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import TimezoneSelect from "react-timezone-select";
import { useForm, Controller } from "react-hook-form";
import { InputLabel, Select } from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    backgroundColor: green[500],
  },
}));

export default function CreateStructure() {
  const [selectedTimezone, setSelectedTimezone] = useState({
    value: "America/Juneau",
    label: "(GMT-8:00) Alaska",
    abbrev: "AHST",
    altName: "Alaskan Standard Time",
  });

  const dispatch = useDispatch();
  const structures = useSelector((state) => state.structures);
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [structure, setStructure] = React.useState("");

  const initialValues = {
    businessId: "",
    name: "",
    description: "",
    city: "",
    country: "",
    timezone: "",
    isActive: false,
    sortIndex: 0,
    structure: "",
    structures: [],
    machines: [],
  };

  const [initialStructure, setInitialStructure] = useState(initialValues);

  const handleChange = (event) => {
    setStructure(event.target.value);
  };

  const onSubmit = (data) => {
    let newStructure = initialValues;
    newStructure.businessId = data.businessId;
    newStructure.name = data.name;
    newStructure.description = data.description;
    newStructure.city = data.city;
    newStructure.country = data.country;
    newStructure.timezone = selectedTimezone.value;
    if (structure === "No parent structure") {
      newStructure.structure = null;
    }

    console.log(newStructure);
    setSubmitted(true);
  };

  /*
  const handleInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.id]: event.target.value,
    }));
  };
*/

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
                    autoFocus={true}
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
              <FormHelperText id="timezone">Timezone required</FormHelperText>
              <TimezoneSelect
                value={selectedTimezone}
                onChange={setSelectedTimezone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency-native"
                fullWidth
                select
                value={structure}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select parent structure"
                variant="outlined"
              >
                <option>No parent structure</option>
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
            Submit New Structure Data
          </Button>
        </form>
        <Grid item xs={12}>
          <Link to="/" className="btn">
            <Button variant="contained" color="default" p={3}>
              return home
            </Button>
          </Link>
        </Grid>
      </div>
    </Container>
  );
}
