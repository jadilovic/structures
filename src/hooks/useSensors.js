import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import authHeader from '../service/auth-header';
import { loadSensors } from '../actions/creator';

export default function useSensors() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/api/sensors?populate=machine', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadSensors(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }, []);
}
