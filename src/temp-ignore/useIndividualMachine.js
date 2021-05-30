import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import authHeader from "../service/auth-header";
import { loadIndividualMachine } from "./creator";

export default function useIndividualMachine(id) {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/machines/${id}?populate=sensors`, {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadIndividualMachine(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        console.log(error);
      });
  }, []);
}
