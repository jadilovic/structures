import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authHeader from '../service/auth-header';
import { clearData, displayMachine } from '../actions/creator';

export default function useIndividualMachine(id) {
  const dispatch = useDispatch();
  const history = useHistory();

  const displayMachineRow = async (machineId) => {
    dispatch(clearData());
    const response = await axios
      .get(`/api/machines/${machineId}?populate=sensors`, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.log(error);
      });
    if (response) {
      dispatch(displayMachine(response.data));
      history.push('/individual-machine');
    }
  };

  displayMachineRow(id);
}

/*
  const displayMachineRow = async (machineId) => {
    dispatch(clearData());
    const response = await axios
      .get(`/api/machines/${machineId}?populate=sensors`, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.log(error);
      });
    if (response) {
      dispatch(displayMachine(response.data));
      history.push("/individual-machine");
    }
  };
  */
