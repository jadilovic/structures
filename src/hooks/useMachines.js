import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import authHeader from '../service/auth-header';
import { loadMachines } from '../actions/creator';

export default function useMachines() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/api/machines?populate=sensors', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadMachines(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }, []);
}
