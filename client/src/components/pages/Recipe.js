import Header from '../Header';
import Button from '../Button';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Delete from '../Delete';
import Alert from '../Alert';

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [user, setUser] = useState('');
  const [userAllowed, setUserAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [alert, setAlert] = useState(false);
  const history = useHistory();

  useEffect(
    () => {
      const fetchRecipe = async () => {
        const res = await fetch(
          `https://legassick-recipes.herokuapp.com/api/v1/recipes/${id}`
        );
        const data = await res.json();
        const recipe = data.data;
        setIsLoading(false);
        setRecipe(recipe);
        return recipe;
      };
      fetchRecipe();
      getUser();
    },
    // eslint-disable-next-line
    [id]
  );

  const getUser = async () => {
    const res = await fetch(
      'https://legassick-recipes.herokuapp.com/api/v1/auth/me',
      {
        method: 'GET',
        credentials: 'include'
      }
    );
    const data = await res.json();
    setUser(data.data);
    checkUserPermissions();
  };

  const checkUserPermissions = () => {
    if (recipe.user === user._id || user.role === 'admin') {
      setUserAllowed(true);
    }
  };

  const editRecipe = () => {
    if (userAllowed) {
      history.push(`/create/${id}`);
    } else {
      setAlert(true);
    }
  };

  const deleteRecipe = () => {
    if (userAllowed) {
      setShowDelete(true);
    } else {
      setAlert(true);
    }
  };

  const cancelDelete = () => {
    setShowDelete(false);
  };

  const confirmDelete = async () => {
    await fetch(
      `https://legassick-recipes.herokuapp.com/api/v1/recipes/${id}`,
      {
        method: 'DELETE',
        credentials: 'include'
      }
    );
    history.push('/');
  };

  return (
    <div>
      <div className='flex justify-between w-full my-10'>
        <Link to='/'>
          <Button text='Go Back' />
        </Link>
        <Button text='Edit Recipe' onClick={editRecipe} />
        {/* <Link to={`/create/${id}`}>
          <Button text='Edit Recipe' />
        </Link> */}
      </div>
      {isLoading && <div>Loading...</div>}
      <Header title={recipe.name} />
      <h2 className='text-2xl'>Ingredients:</h2>
      {recipe.ingredients && (
        <ul className='my-4'>
          {recipe.ingredients.map((ingredient, idx) => {
            return <li key={`${ingredient} - ${idx}`}>{ingredient}</li>;
          })}
        </ul>
      )}
      <h2 className='text-2xl'>Instructions:</h2>
      {recipe.instructions && (
        <ul className='my-4'>
          {recipe.instructions.map((instruction, idx) => {
            return (
              <li key={`${instruction} - ${idx}`} className='mb-3'>
                {instruction}
              </li>
            );
          })}
        </ul>
      )}
      {!isLoading && (
        <div className='flex justify-center my-8'>
          <Button
            text='Delete Recipe'
            onClick={deleteRecipe}
            className='bg-red-600 text-white'
          />
        </div>
      )}
      {showDelete && (
        <Delete confirmDelete={confirmDelete} cancelDelete={cancelDelete} />
      )}
      {alert && <Alert />}
    </div>
  );
};

export default Recipe;
