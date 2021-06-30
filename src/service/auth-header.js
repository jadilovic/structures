import jwtDecode from 'jwt-decode';
import history from './history';

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    const { exp } = jwtDecode(user.token);
    const expirationTime = exp * 1000 - 604800000 + 3600000;

    setInterval(() => {
      if (Date.now() >= expirationTime) {
        localStorage.clear();
        history.push('/login');
      }
      return {};
    }, 2000);

    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
  } else {
    history.push('/login');
  }
  return {};
}
