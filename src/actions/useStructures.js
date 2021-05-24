import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import authHeader from "../service/auth-header";
import { loadStructures } from "./creator";

export default function useStructures() {
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
        console.log("FINALLY useStructures");
      });
  }, []);
}
