import { Link } from 'react-router-dom';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes.length === 0 && (
        <div className='flex justify-center'>No recipes found</div>
      )}
      {recipes.map(recipe => (
        <div key={recipe._id}>
          <Link to={`/recipe/${recipe._id}`}>
            <div className='text-center bg-gray-200 my-6 p-8'>
              <h2 className='text-2xl font-bold'>{recipe.name}</h2>
              <p>Tap to view</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
