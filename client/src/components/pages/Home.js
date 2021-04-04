import Header from '../Header';
import RecipeList from '../RecipeList';
import Search from '../Search';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(
        'https://legassick-recipes.herokuapp.com/api/v1/recipes'
      );
      const data = await res.json();
      const recipes = data.data;
      setIsLoading(false);
      setRecipes(recipes);
      return recipes;
    };
    fetchRecipes();
    getUser();
  }, []);

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
  };

  const logout = async () => {
    await fetch('https://legassick-recipes.herokuapp.com/api/v1/auth/logout', {
      method: 'GET',
      credentials: 'include'
    });
    setUser('');
  };

  const searchRecipes = async ({ text }) => {
    setIsLoading(true);
    const res = await fetch(
      `https://legassick-recipes.herokuapp.com/api/v1/recipes?name=${text}`
    );
    const data = await res.json();
    const recipes = data.data;
    setRecipes(recipes);
    setIsLoading(false);
    return recipes;
  };

  const getRandomRecipe = async () => {
    setIsLoading(true);
    const res = await fetch(
      'https://legassick-recipes.herokuapp.com/api/v1/recipes/random'
    );
    const data = await res.json();
    const recipe = data.data;
    setRecipes(recipe);
    setIsLoading(false);
    return recipe;
  };

  const guestLinks = (
    <>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <Link to='/' onClick={logout}>
          Logout
        </Link>
      </li>
    </>
  );

  return (
    <div>
      <div className='flex justify-between items-center'>
        {!user ? (
          <Header title='Hello' />
        ) : (
          <Header title={'Hello ' + user.name} />
        )}
        <ul className='flex flex-col'>{!user ? guestLinks : userLinks}</ul>
      </div>
      <Search onAdd={searchRecipes} />
      <div className='my-5 flex justify-between'>
        <Button
          text='Random'
          onClick={getRandomRecipe}
          className='w-6/12 mr-8'
        />
        <Link to='/create' className='w-6/12'>
          <Button text='Create Recipe' className='w-full' />
        </Link>
      </div>
      {isLoading ? (
        <div className='flex justify-center'>Loading...</div>
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </div>
  );
};

export default Home;
