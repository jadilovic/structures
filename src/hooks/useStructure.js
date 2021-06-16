import axios from 'axios';
import { useDispatch } from 'react-redux';
import authHeader from '../service/auth-header';
import { loadStructures } from '../actions/creator';

const useStructure = () => {
  const dispatch = useDispatch();

  function fetchStructuresWithMachines() {
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
  }

  function fetchStructuresOnly() {
    axios
      .get('/api/structures', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadStructures(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  return {
    fetchStructuresOnly,
    fetchStructuresWithMachines,
  };
};

export default useStructure;
