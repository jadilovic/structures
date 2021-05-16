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
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(createStructure(values));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log("useEffect");
    setValues(initialValues);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
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
                name="name"
                variant="outlined"
                required
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
                name="city"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                value={values.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="country"
                variant="outlined"
                required
                fullWidth
                id="country"
                label="Country"
                value={values.country}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="timezone"
                variant="outlined"
                required
                fullWidth
                id="timezone"
                label="Timezone"
                value={values.timezone}
                onChange={handleInputChange}
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
