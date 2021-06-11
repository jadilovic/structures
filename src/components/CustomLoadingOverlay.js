import React from 'react';
import { GridOverlay } from '@material-ui/data-grid';
import { Grid, CircularProgress, Typography } from '@material-ui/core';

export default function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Typography>Loading...</Typography>
        <CircularProgress />
      </Grid>
    </GridOverlay>
  );
}
