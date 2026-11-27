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
 * ingredient input.
 *
 * The Ingredient Repository handles data access by sending
 * requests to the backend API and retrieving updated ingredients.
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Validate ingredient information using the service
    if (!ingredientService.isValidIngredient(name, characteristics)) {
      return;
    }

    try {
      // Add the ingredient using the backend API
      await ingredientRepository.create({
        name: name.trim(),
        characteristics: characteristics.trim(),
      });

      // Refresh the ingredient list from the backend
      setIngredients(await ingredientRepository.getAll());

      // Clear the form after successfully adding
      resetName();
      resetCharacteristics();
    } catch (error) {
      console.error("Failed to add ingredient:", error);
    }
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