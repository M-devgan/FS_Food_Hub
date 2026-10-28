import { useState } from "react";
import type { Ingredient } from "../../types/Ingredient";
import { ingredientRepository } from "../../repositories/ingredientRepository";

type IngredientFormProps = {
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
};

function IngredientForm({ setIngredients }: IngredientFormProps) {
  const [name, setName] = useState("");
  const [characteristics, setCharacteristics] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Do not add an ingredient if the fields are empty
    if (name.trim() === "" || characteristics.trim() === "") {
      return;
    }

    // Create a new ingredient
    const newIngredient: Ingredient = {
      id: Date.now(),
      name: name.trim(),
      characteristics: characteristics.trim(),
      recipes: [],
    };

    // Add the ingredient using the repository
    ingredientRepository.create(newIngredient);

    // Refresh the ingredient list from the repository
    setIngredients(ingredientRepository.getAll());

    // Clear the form after adding
    setName("");
    setCharacteristics("");
  };

  return (
    <section className="ingredient-form">
      <h2>Add Ingredient</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ingredient-name">Ingredient Name:</label>

          <input
            id="ingredient-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter ingredient name"
          />
        </div>

        <div>
          <label htmlFor="ingredient-characteristics">
            Characteristics:
          </label>

          <textarea
            id="ingredient-characteristics"
            value={characteristics}
            onChange={(event) => setCharacteristics(event.target.value)}
            placeholder="Enter ingredient characteristics"
            rows={4}
          />
        </div>

        <button type="submit">Add Ingredient</button>
      </form>
    </section>
  );
}

export default IngredientForm;