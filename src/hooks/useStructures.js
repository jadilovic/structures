import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import authHeader from '../service/auth-header';
import { loadStructures } from '../actions/creator';

export default function useStructures() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/api/structures?populate=machines', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadStructures(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }, []);
}
