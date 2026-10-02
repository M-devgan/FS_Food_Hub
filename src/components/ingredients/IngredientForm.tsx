import { useState } from "react";

type Ingredient = {
  id: number;
  name: string;
  characteristics: string;
  recipes: number[];
};

type IngredientFormProps = {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
};

function IngredientForm({
  ingredients,
  setIngredients,
}: IngredientFormProps) {
  const [name, setName] = useState("");
  const [characteristics, setCharacteristics] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Do not add an ingredient if the fields are empty
    if (name.trim() === "" || characteristics.trim() === "") {
      return;
    }

    // Create a new ingredient
    const newIngredient = {
      id: Date.now(),
      name: name,
      characteristics: characteristics,
      recipes: [],
    };

    // Add the new ingredient to the list
    setIngredients([...ingredients, newIngredient]);

    // Clear the form after adding
    setName("");
    setCharacteristics("");
  };

  return (
    <section className="ingredient-form">
      <h2>Add Ingredient</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ingredient-name">Ingredient Name</label>

          <input
            id="ingredient-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="ingredient-characteristics">
            Characteristics
          </label>

          <input
            id="ingredient-characteristics"
            type="text"
            value={characteristics}
            onChange={(event) => setCharacteristics(event.target.value)}
          />
        </div>

        <button type="submit">Add Ingredient</button>
      </form>
    </section>
  );
}

export default IngredientForm;