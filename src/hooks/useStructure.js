import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import authHeader from '../service/auth-header';
import { displayStructure, loadStructures } from '../actions/creator';

const useStructure = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  function fetchStructuresWithMachinesParentStructure() {
    axios
      .get('/api/structures?populate=machines structure', {
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

  function fetchStructureById(id) {
    const structure = axios
      .get(`/api/structures/${id}`, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
    return structure;
  }

  function fetchStructureByIdToUpdate(id) {
    axios
      .get(`/api/structures/${id}?populate=machines structure`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response) {
          dispatch(displayStructure(response.data));
          history.push('/update-structure');
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  function updateStructure(update) {
    axios
      .put('/api/structures', update, {
        headers: authHeader(),
      })
      .then(() => {
        console.log('UPDATED STRUCTURE');
        dispatch(displayStructure(update));
        history.push('/individual-structure');
      })
      .catch((error) => {
        console.log('ERROR UPDATING STRUCTURE');
        console.log(error.response.data);
      });
  }

  return {
    fetchStructuresOnly,
    fetchStructuresWithMachines,
    fetchStructuresWithMachinesParentStructure,
    fetchStructureById,
    fetchStructureByIdToUpdate,
    updateStructure,
  };
};

export default useStructure;
