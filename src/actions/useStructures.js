import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import authHeader from "../service/auth-header";
import { loadStructures } from "./creator";

export default function useStructures() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/structures?populate=machines", {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadStructures(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
}
