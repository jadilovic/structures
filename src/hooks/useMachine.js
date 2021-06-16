import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import authHeader from '../service/auth-header';
import { clearData, displayMachine, loadMachines } from '../actions/creator';

export function useMachines() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('/api/machines?populate=sensors', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadMachines(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }, []);
}

export function useAllMachines() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('/api/machines', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadMachines(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }, []);
}

export async function useMachineById(id) {
  const dispatch = useDispatch();
  const history = useHistory();
  const response = await axios
    .get(`/api/machines/${id}?populate=sensors`, {
      headers: authHeader(),
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
      console.log(error);
    });
  if (response) {
    dispatch(displayMachine(response.data));
    history.push('/individual-machine');
  }
}
