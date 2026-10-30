import { useState } from 'react'
import RecipeForm from './RecipeForm'
import { recipeRepository } from '../../repositories/recipeRepository'

// Props for the shared state from App.tsx
type RecipeListProps = {
  recipesCooked: number;
  setRecipesCooked: React.Dispatch<React.SetStateAction<number>>;
};

/*
 * I.3 - Recipe List Architecture
 *
 * Repository: recipeRepository retrieves recipes and removes recipes.
 *
 * This keeps recipe data access separate from the component.
 * The component is responsible for displaying recipes and
 * updating the user interface.
 */
function RecipeList({
  recipesCooked,
  setRecipesCooked,
}: RecipeListProps) {

  const [recipes, setRecipes] = useState(() => recipeRepository.getAll());

  return (
    <section className="recipe-list">
      <h2>Popular Recipes</h2>

      {/* Display and modify the shared state */}
      <div className="shared-state">
        <p>Recipes Cooked: {recipesCooked}</p>

        <button
          type="button"
          onClick={() => setRecipesCooked(recipesCooked + 1)}
        >
          Add One
        </button>
      </div>

      <RecipeForm setRecipes={setRecipes} />

      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <article className="recipe-card" key={recipe.id}>
            <div className="recipe-image">
              <span>🍽️</span>
            </div>

            <div className="recipe-content">
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>

              <button type="button">
                View Recipe
              </button>

              <button
                type="button"
                onClick={() => {
                  recipeRepository.delete(recipe.id);
                  setRecipes(recipeRepository.getAll());
                }}
              >
                Remove Recipe
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecipeList;