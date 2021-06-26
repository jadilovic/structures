import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import authHeader from '../service/auth-header';
import {
  loadSensors,
  displaySensor,
  loadSensorTypes,
} from '../actions/creator';

const useSensor = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function fetchSensorsWithMachines() {
    axios
      .get('/api/sensors?populate=machine', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadSensors(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  function fetchSensorsOnly() {
    axios
      .get('/api/sensors', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadSensors(response.data));
        history.push('/edit-machine');
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  function fetchSensorById(sensorId) {
    axios
      .get(`/api/sensors/${sensorId}?populate=machine`, {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(displaySensor(response.data));
        history.push('/individual-sensor');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchSensorTypes() {
    axios
      .get('/api/sensors/sensor-types', {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(loadSensorTypes(response.data));
        history.push('/edit-sensor');
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        console.log(error);
      });
  }

  function editSensor(editedSensor) {
    axios
      .put('/api/sensors', editedSensor, {
        headers: authHeader(),
      })
      .then(() => {
        console.log('EDITED SENSOR');
        dispatch(displaySensor(editedSensor));
        history.push('/individual-sensor');
      })
      .catch((error) => {
        console.log('ERROR EDITING SENSOR');
        console.log(error.response.data);
      });
  }

  return {
    fetchSensorsOnly,
    fetchSensorsWithMachines,
    fetchSensorById,
    fetchSensorTypes,
    editSensor,
  };
};

export default useSensor;
