import { useState } from "react";
import IngredientForm from "./IngredientForm";
import { ingredientRepository } from "../../repositories/ingredientRepository";

// Props received from App.tsx for shared state
type IngredientsListProps = {
  recipesCooked: number;
  setRecipesCooked: React.Dispatch<React.SetStateAction<number>>;
};

// Ingredients component for displaying ingredients for each recipe
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