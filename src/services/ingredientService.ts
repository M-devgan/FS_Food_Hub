
import type { Ingredient } from "../types/Ingredient";

export const ingredientService = {
  // Check whether ingredient information is valid
  isValidIngredient(name: string, characteristics: string): boolean {
    return name.trim() !== "" && characteristics.trim() !== "";
  },

  // Prepare ingredient information using business rules
  prepareIngredient(
    id: number,
    name: string,
    characteristics: string
  ): Ingredient {
    return {
      id,
      name: name.trim(),
      characteristics: characteristics.trim(),
      recipes: [],
    };
  },

  // Check whether an ingredient has a valid ID for removal
  canRemoveIngredient(id: number): boolean {
    return Number.isInteger(id) && id > 0;
  },
};
