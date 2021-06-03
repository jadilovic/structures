// src/pages/Error.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, CardMedia } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import image from "../images/Error404.png";

export default function Error() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "25vh" }}
    >
      <CardMedia
        component="img"
        alt="Error Page"
        src={image}
        style={{ width: "50%", height: "50%" }}
        title="Error Page"
      />
      <p />
      <Link to="/" className="btn">
        <Button size="large" variant="contained" color="primary" p={3}>
          back home or login page
        </Button>
      </Link>
    </Grid>
  );
}
