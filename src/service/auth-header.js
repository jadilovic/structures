import jwtDecode from 'jwt-decode';
import history from './history';

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  let expirationTime;

  try {
    const { exp } = jwtDecode(user.token);
    expirationTime = exp * 1000 - 604800000 + 3600000;
  } catch (error) {
    localStorage.clear();
    history.push('/login');
  }

  if (Date.now() >= expirationTime) {
    localStorage.clear();
    history.push('/login');
  }

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
}
