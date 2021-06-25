import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import authHeader from '../service/auth-header';
import {
  displayMachine,
  loadMachines,
  loadMachineTypes,
} from '../actions/creator';

const useMachine = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function fetchMachinesWithSensors() {
    axios
      .get('/api/machines?populate=sensors structure', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadMachines(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  function fetchMachinesOnly() {
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
  }

  function fetchMachineById(id) {
    axios
      .get(`/api/machines/${id}?populate=sensors structure`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response) {
          dispatch(displayMachine(response.data));
          history.push('/individual-machine');
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  function fetchMachineTypes() {
    axios
      .get('/api/machines/machine-types', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadMachineTypes(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  function editMachine(editedMachine) {
    axios
      .put('/api/machines', editedMachine, {
        headers: authHeader(),
      })
      .then(() => {
        console.log('EDITED MACHINE');
        dispatch(displayMachine(editedMachine));
        history.push('/individual-machine');
      })
      .catch((error) => {
        console.log('ERROR EDITING MACHINE');
        console.log(error.response.data);
      });
  }

  return {
    fetchMachinesWithSensors,
    fetchMachinesOnly,
    fetchMachineById,
    fetchMachineTypes,
    editMachine,
  };
};

export default useMachine;
