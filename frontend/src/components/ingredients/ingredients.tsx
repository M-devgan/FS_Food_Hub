import { useState, useEffect } from "react";
import IngredientForm from "./IngredientForm";
import { ingredientRepository } from "../../repositories/ingredientRepository";
import { ingredientService } from "../../services/ingredientService";
import { useCookingStats } from "../../hooks/useCookingStats";
import type { Ingredient } from "../../types/Ingredient";

/**
 * IngredientsList retrieves ingredient data from the backend API
 * and supports reading, updating, and removing ingredients.
 */
function IngredientsList() {
  const { recipesCooked, addRecipeCooked } = useCookingStats();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  // State for editing ingredients
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCharacteristics, setEditCharacteristics] = useState("");

  // Load ingredients from the backend
  useEffect(() => {
    ingredientRepository.getAll()
      .then(setIngredients)
      .catch((error) => {
        console.error("Failed to load ingredients:", error);
      });
  }, []);

  // Remove an ingredient
  const removeIngredient = async (id: number) => {
    if (!ingredientService.canRemoveIngredient(id)) {
      return;
    }

    try {
      await ingredientRepository.remove(id);
      setIngredients(await ingredientRepository.getAll());
    } catch (error) {
      console.error("Failed to remove ingredient:", error);
    }
  };

  // Start editing an ingredient
  const startEditing = (ingredient: Ingredient) => {
    setEditingId(ingredient.id);
    setEditName(ingredient.name);
    setEditCharacteristics(ingredient.characteristics);
  };

  // Save updated ingredient to the database
  const saveIngredient = async (id: number) => {
    if (
      !ingredientService.isValidIngredient(
        editName,
        editCharacteristics
      )
    ) {
      return;
    }

    try {
      await ingredientRepository.update(id, {
        name: editName.trim(),
        characteristics: editCharacteristics.trim(),
      });

      setIngredients(await ingredientRepository.getAll());
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update ingredient:", error);
    }
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
              {editingId === ingredient.id ? (
                <>
                  <input
                    type="text"
                    aria-label="Edit ingredient name"
                    value={editName}
                    onChange={(event) =>
                      setEditName(event.target.value)
                    }
                  />

                  <textarea
                    aria-label="Edit ingredient characteristics"
                    value={editCharacteristics}
                    onChange={(event) =>
                      setEditCharacteristics(event.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => saveIngredient(ingredient.id)}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3>{ingredient.name}</h3>
                  <p>{ingredient.characteristics}</p>

                  <button
                    type="button"
                    onClick={() => startEditing(ingredient)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => removeIngredient(ingredient.id)}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default IngredientsList;