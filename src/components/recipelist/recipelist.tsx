import { useState } from 'react'
import RecipeForm from './RecipeForm'
import { recipeRepository } from '../../repositories/recipeRepository'
import { useCookingStats } from '../../hooks/useCookingStats'

/*
 * I.3 - Recipe List Architecture
 *
 * Repository: recipeRepository retrieves recipes and removes recipes.
 *
 * The useCookingStats hook manages the shared Recipes Cooked state
 * through the hook-service-repository architecture.
 *
 * This keeps data access and shared state logic separate from
 * the component presentation.
 */
function RecipeList() {
  const [recipes, setRecipes] = useState(() => recipeRepository.getAll())
  const { recipesCooked, addRecipeCooked } = useCookingStats()

  return (
    <section className="recipe-list">
      <h2>Popular Recipes</h2>

      <div className="shared-state">
        <p>Recipes Cooked: {recipesCooked}</p>

        <button
          type="button"
          onClick={addRecipeCooked}
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
                  recipeRepository.delete(recipe.id)
                  setRecipes(recipeRepository.getAll())
                }}
              >
                Remove Recipe
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecipeList