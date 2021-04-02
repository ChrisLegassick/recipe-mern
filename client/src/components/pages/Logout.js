import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {
  const history = useHistory();

  useEffect(
    () => {
      const logout = async () => {
        await fetch(
          'https://legassick-recipes.herokuapp.com/api/v1/auth/logout',
          {
            method: 'GET',
            credentials: 'include'
          }
        );
        history.push('/');
      };
      logout();
    }, //eslint-disable-next-line
    []
  );

  return (
    <div>
      <h1>Logging you out...</h1>
    </div>
  );
};

export default Logout;
