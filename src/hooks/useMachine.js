import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import authHeader from '../service/auth-header';
import { displayMachine, loadMachines } from '../actions/creator';

const useMachine = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function fetchMachinesWithSensors() {
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
      .get(`/api/machines/${id}?populate=sensors`, {
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

  return {
    fetchMachinesWithSensors,
    fetchMachinesOnly,
    fetchMachineById,
  };
};

export default useMachine;
