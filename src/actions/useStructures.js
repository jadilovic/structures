import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import authHeader from "../service/auth-header";
import { setStructures } from "./creator";

export default function useStructures() {
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
}
