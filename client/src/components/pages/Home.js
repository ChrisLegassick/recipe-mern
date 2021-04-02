import Header from '../Header';
import RecipeList from '../RecipeList';
import Search from '../Search';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

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

  return (
    <div>
      <div className='flex justify-between items-center'>
        <Header title='My Recipes' />
        <Link to='/login'>Login</Link>
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
