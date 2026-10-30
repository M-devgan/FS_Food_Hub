
import { useFormFields } from "../../hooks/useFormFields";
import type { Ingredient } from "../../types/Ingredient";
import { ingredientRepository } from "../../repositories/ingredientRepository";
import { ingredientService } from "../../services/ingredientService";

type IngredientFormProps = {
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
};

/**
 * IngredientForm uses the useFormFields custom hook to manage
 * the ingredient name and characteristics input fields.
 *
 * The Ingredient Service handles business logic by validating
 * input and preparing a new Ingredient object.
 *
 * The Ingredient Repository handles data access by creating
 * the ingredient and retrieving the updated ingredient list.
 *
 * This separates presentation logic, business logic, and
 * data access, making the component easier to maintain.
 */

function IngredientForm({ setIngredients }: IngredientFormProps) {
  const {
    value: name,
    setValue: setName,
    resetValue: resetName,
  } = useFormFields("");

  const {
    value: characteristics,
    setValue: setCharacteristics,
    resetValue: resetCharacteristics,
  } = useFormFields("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate ingredient information using the service
    if (!ingredientService.isValidIngredient(name, characteristics)) {
      return;
    }

    // Prepare the new ingredient using the service
    const newIngredient = ingredientService.prepareIngredient(
      Date.now(),
      name,
      characteristics
    );

    // Add the ingredient using the repository
    ingredientRepository.create(newIngredient);

    // Refresh the ingredient list from the repository
    setIngredients(ingredientRepository.getAll());

    // Clear the form after adding
    resetName();
    resetCharacteristics();
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
