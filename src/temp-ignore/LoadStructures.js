import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import authHeader from "../service/auth-header";
import StructuresTable from "../views/StructuresTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { setStructures } from "../actions/creator";

export default function LoadStructures() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/structures?populate=machines", {
        headers: authHeader(),
      })
      .then((response) => {
        setData(response.data);
        dispatch(setStructures(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Box>
            <h2>Loading...</h2>
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    );
  } else if (error) {
    return "Error!";
  } else {
    return (
      <>
        <h3 style={{ marginTop: "12vh" }}>Structures Table</h3>
        <StructuresTable props={data} />
      </>
    );
  }
}
