import Header from '../Header';
import Button from '../Button';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Create = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  // const [ingredients, setIngredients] = useState([{ value: '' }]);
  const [ingredients, setIngredients] = useState([]);
  // const [instructions, setInstructions] = useState([{ value: '' }]);
  const [instructions, setInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleChangeIngredients = (idx, e) => {
    const values = [...ingredients];
    values[idx].value = e.target.value;
    setIngredients(values);
  };

  const handleChangeInstructions = (idx, e) => {
    const values = [...instructions];
    values[idx].value = e.target.value;
    setInstructions(values);
  };

  const handleAddIngredients = () => {
    const values = [...ingredients, { value: '' }];
    setIngredients(values);
  };

  const handleAddInstructions = () => {
    const values = [...instructions, { value: '' }];
    setInstructions(values);
  };

  const handleRemoveIngredients = idx => {
    const values = [...ingredients];
    values.splice(idx, 1);
    setIngredients(values);
  };

  const handleRemoveInstructions = idx => {
    const values = [...instructions];
    values.splice(idx, 1);
    setInstructions(values);
  };

  const fetchRecipe = async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://legassick-recipes.herokuapp.com/api/v1/recipes/${id}`
    );
    const data = await res.json();
    const recipe = data.data;
    setName(recipe.name);
    fillIngredientsInputs(recipe);
    fillInstructionsInputs(recipe);
    setIsLoading(false);
  };

  const fillIngredientsInputs = recipe => {
    let ingredients = [];
    recipe.ingredients.map((ingredient, idx) => {
      const values = [...ingredients, { value: '' }];
      ingredients = values;
      values[idx].value = ingredient;
      setIngredients(values);
      return values;
    });
  };

  const fillInstructionsInputs = recipe => {
    let instructions = [];
    recipe.instructions.map((instruction, idx) => {
      const values = [...instructions, { value: '' }];
      instructions = values;
      values[idx].value = instruction;
      setInstructions(values);
      return values;
    });
  };

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
    // eslint-disable-next-line
  }, [id]);

  const onSubmit = async e => {
    e.preventDefault();

    const ingredientsValues = ingredients.map(ingredient => {
      return ingredient.value;
    });

    const instructionsValues = instructions.map(instruction => {
      return instruction.value;
    });

    const recipe = {
      name,
      ingredients: ingredientsValues,
      instructions: instructionsValues
    };

    if (id) {
      await fetch(
        `https://legassick-recipes.herokuapp.com/api/v1/recipes/${id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recipe)
        }
      );
      history.push(`/recipe/${id}`);
    } else {
      const res = await fetch(
        'https://legassick-recipes.herokuapp.com/api/v1/recipes',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recipe)
        }
      );
      const data = await res.json();
      const id = data.data._id;
      history.push(`/recipe/${id}`);
    }
  };

  return (
    <div className='my-10'>
      {!id ? (
        <Link to='/'>
          <Button text='Go Back' />
        </Link>
      ) : (
        <Link to={`/recipe/${id}`}>
          <Button text='Go Back' />
        </Link>
      )}
      {!id ? <Header title='Create recipe' /> : <Header title='Edit recipe' />}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={onSubmit} className='flex flex-col'>
          <label className='flex flex-col mb-6'>
            Recipe Name:
            <input
              className='my-2'
              type='text'
              required
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </label>
          <label className='flex flex-col mb-6'>
            Recipe Ingredients:
            {ingredients.map((ingredient, idx) => {
              return (
                <div key={`${ingredient}-${idx}`} className='flex'>
                  <input
                    className='my-2 mr-4 flex-grow'
                    type='text'
                    required
                    autoFocus
                    value={ingredient.value}
                    onChange={e => handleChangeIngredients(idx, e)}
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveIngredients(idx)}
                  >
                    X
                  </button>
                </div>
              );
            })}
            <Button
              className='mt-4'
              type='button'
              text='+'
              onClick={handleAddIngredients}
            />
          </label>

          <label className='flex flex-col mb-8'>
            Recipe Instructions:
            {instructions.map((instruction, idx) => {
              return (
                <div className='flex' key={`${instruction}-${idx}`}>
                  <textarea
                    className='my-2 flex-grow mr-4'
                    required
                    autoFocus
                    value={instruction.value}
                    onChange={e => handleChangeInstructions(idx, e)}
                  ></textarea>
                  <button
                    type='button'
                    onClick={() => handleRemoveInstructions(idx)}
                  >
                    X
                  </button>
                </div>
              );
            })}
            <Button
              className='mt-4'
              type='button'
              text='+'
              onClick={handleAddInstructions}
            />
          </label>
          <input type='submit' value='Save Recipe' className='bg-green-400' />
        </form>
      )}
    </div>
  );
};

export default Create;
