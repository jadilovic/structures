// src/pages/Error.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, CardMedia } from "@material-ui/core";
import image from "../images/Error404.png";
import Grid from "@material-ui/core/Grid";

export default function Error() {
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
          style={{ width: "100%", height: "100%" }}
          title="Error Page"
        />
      </Grid>
      <p></p>
      <Link to="/" className="btn">
        <Button size="large" variant="contained" color="primary" p={3}>
          back home or login page
        </Button>
      </Link>
    </Grid>
  );
}
