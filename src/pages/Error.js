// src/pages/Error.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, CardMedia } from "@material-ui/core";
import image from "../service/404-error.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Error() {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={6} spacing={3}>
        <CardMedia
          component="img"
          alt="Error Page"
          height="140"
          src={image}
          alt="test"
          style={{ width: "100%", height: "100%" }}
          title="Error Page"
        />
      </Grid>
      <Link to="/" className="btn">
        <Button size="large" variant="contained" color="primary" p={3}>
          back home or login page
        </Button>
      </Link>
    </Grid>
  );
}
