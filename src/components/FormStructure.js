import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { green } from "@material-ui/core/colors";
import { createStructure } from "../actions/creator";
import { useDispatch } from "react-redux";

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
  const classes = useStyles();
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

  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [notValid, setNotValid] = useState(false);
  const dispatch = useDispatch();
  //const getStructures = useSelector();

  const handleInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.city === "" ||
      values.country === "" ||
      values.name === "" ||
      values.timezone === ""
    ) {
      setNotValid(true);
      return;
    }
    setSubmitted(true);
    console.log(values);
    dispatch(createStructure(values));
  };

  useEffect(() => {
    console.log("useEffect");
    setValues(initialValues);
    setTimeout(() => {
      setSubmitted(false);
      setNotValid(false);
    }, 3000);
  }, [submitted, notValid]);

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
        {notValid && (
          <Alert severity="error">Required Field Must Be Completed</Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="businessId"
                variant="outlined"
                fullWidth
                id="businessId"
                label="Business ID"
                value={values.businessId}
                onChange={handleInputChange}
                autoFocus={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Structure Name"
                value={values.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                variant="outlined"
                fullWidth
                id="description"
                label="Description"
                value={values.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                name="city"
                variant="outlined"
                fullWidth
                id="city"
                label="City"
                value={values.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                name="country"
                variant="outlined"
                fullWidth
                id="country"
                label="Country"
                value={values.country}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                name="timezone"
                variant="outlined"
                fullWidth
                id="timezone"
                label="Timezone"
                value={values.timezone}
                onChange={handleInputChange}
              />
            </Grid>
            {/*
            <Grid item xs={12}>
              <TextField
                required={true}
                name="structure"
                variant="outlined"
                fullWidth
                id="structure"
                label="Structure"
                value={values.structure}
                onChange={handleInputChange}
              />
            </Grid>
              */}
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2" component="button">
                Return Home
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
