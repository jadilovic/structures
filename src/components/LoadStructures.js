import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import authHeader from "../service/auth-header";
import StructuresTable from "../tables/StructuresTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
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
      <div>
        <p>Started Loading</p>
        <h3>Loading...</h3>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
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
