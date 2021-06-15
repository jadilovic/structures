import { useMachineById } from './useMachine';

function WithHook(machineId) {
  console.log(machineId);
  useMachineById(machineId);
}

export default WithHook;
