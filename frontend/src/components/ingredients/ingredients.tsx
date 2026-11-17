import { useState } from "react";
import IngredientForm from "./IngredientForm";
import { ingredientRepository } from "../../repositories/ingredientRepository";
import { ingredientService } from "../../services/ingredientService";
import { useCookingStats } from "../../hooks/useCookingStats";

/**
 * IngredientsList displays ingredient data retrieved from the
 * Ingredient Repository and manages the displayed list using React state.
 *
 * The Ingredient Service validates ingredient IDs before removal,
 * while the repository handles deleting and retrieving ingredients.
 *
 * The useCookingStats hook manages the shared Recipes Cooked state
 * through the hook-service-repository architecture.
 *
 * This separates presentation logic, business logic, and data access,
 * making the Ingredients feature easier to maintain.
 */
function IngredientsList() {
  const { recipesCooked, addRecipeCooked } = useCookingStats();

  // Get ingredient data from the repository
  const [ingredients, setIngredients] = useState(() =>
    ingredientRepository.getAll()
  );

  // Remove an ingredient using the repository
  const removeIngredient = (id: number) => {
    // Validate the ingredient ID using the service
    if (!ingredientService.canRemoveIngredient(id)) {
      return;
    }

    // Remove the ingredient using the repository
    ingredientRepository.remove(id);
    setIngredients(ingredientRepository.getAll());
  };

  return (
    <section className="ingredients-list">
      <h2>Recipe Ingredients</h2>

      <div className="shared-state">
        <p>Recipes Cooked: {recipesCooked}</p>

        <button
          type="button"
          onClick={addRecipeCooked}
        >
          Add One
        </button>
      </div>

      <IngredientForm setIngredients={setIngredients} />

      <div className="ingredient-cards">
        {ingredients.map((ingredient) => (
          <article className="ingredient-card" key={ingredient.id}>
            <div className="ingredient-image">
              <span>🥗</span>
            </div>

            <div className="ingredient-content">
              <h3>{ingredient.name}</h3>
              <p>{ingredient.characteristics}</p>

              <button
                type="button"
                onClick={() => removeIngredient(ingredient.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default IngredientsList;