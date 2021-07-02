import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import authHeader from '../service/auth-header';
import { displayStructure, loadStructures } from '../actions/creator';

const useStructure = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function fetchStructures(elements = '') {
    axios
      .get(`/api/structures?populate=${elements}`, {
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

  function fetchStructureById(id, elements = '') {
    axios
      .get(`/api/structures/${id}?populate=${elements}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response) {
          dispatch(displayStructure(response.data));
          console.log(response.data);
          history.push('/individual-structure');
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  function editStructure(editedStructure) {
    axios
      .put('/api/structures', editedStructure, {
        headers: authHeader(),
      })
      .then(() => {
        console.log('EDITED STRUCTURE');
        dispatch(displayStructure(editedStructure));
        history.push('/individual-structure');
      })
      .catch((error) => {
        console.log('ERROR EDITING STRUCTURE');
        console.log(error.response.data);
      });
  }

  return {
    fetchStructures,
    fetchStructureById,
    editStructure,
  };
};

export default useStructure;
