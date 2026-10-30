
import { useState } from "react";
import IngredientForm from "./IngredientForm";
import { ingredientRepository } from "../../repositories/ingredientRepository";
import { ingredientService } from "../../services/ingredientService";

// Props received from App.tsx for shared state
type IngredientsListProps = {
  recipesCooked: number;
  setRecipesCooked: React.Dispatch<React.SetStateAction<number>>;
};


/**
 * IngredientsList displays ingredient data retrieved from the
 * Ingredient Repository and manages the displayed list using React state.
 *
 * The Ingredient Service validates ingredient IDs before removal,
 * while the repository handles deleting and retrieving ingredients.
 *
 * IngredientForm handles adding new ingredients using the custom
 * hook, service, and repository.
 *
 * This separates presentation logic, business logic, and data access,
 * making the Ingredients feature easier to maintain.
 */

function IngredientsList({
  recipesCooked,
  setRecipesCooked,
}: IngredientsListProps) {

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

  // Return the Ingredients section that will be displayed on the page
  return (
    <section className="ingredients-list">
      <h2>Recipe Ingredients</h2>

      {/* Display and update the shared state */}
      <div className="shared-state">
        <p>Recipes Cooked: {recipesCooked}</p>

        <button
          type="button"
          onClick={() => setRecipesCooked(recipesCooked + 1)}
        >
          Add One
        </button>
      </div>

      {/* Form for adding a new ingredient */}
      <IngredientForm setIngredients={setIngredients} />

      <div className="ingredient-cards">

        {/* Loop through the ingredients array and create a card for each item */}
        {ingredients.map((ingredient) => (
          <article className="ingredient-card" key={ingredient.id}>

            {/* Placeholder icon for the ingredient card */}
            <div className="ingredient-image">
              <span>🥗</span>
            </div>

            {/* Display the ingredient name and characteristics */}
            <div className="ingredient-content">
              <h3>{ingredient.name}</h3>
              <p>{ingredient.characteristics}</p>

              {/* Remove the selected ingredient */}
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

// Export the component so it can be imported and used in App.tsx
export default IngredientsList;
