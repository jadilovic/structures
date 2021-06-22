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
          history.push('/form-structure');
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  function editStructure(edit) {
    axios
      .put('/api/structures', edit, {
        headers: authHeader(),
      })
      .then(() => {
        console.log('EDITED STRUCTURE');
        dispatch(displayStructure(edit));
        history.push('/individual-structure');
      })
      .catch((error) => {
        console.log('ERROR EDITING STRUCTURE');
        console.log(error.response.data);
      });
  }

  return {
    fetchStructuresOnly,
    fetchStructuresWithMachines,
    fetchStructuresWithMachinesParentStructure,
    fetchStructureById,
    fetchStructureByIdToUpdate,
    editStructure,
  };
};

export default useStructure;
