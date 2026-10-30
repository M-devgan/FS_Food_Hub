import type { Recipe } from "../types/Recipe";

// Handles recipe business logic, separate from the UI and data access.
export const recipeService = {
  // Check that both required fields contain text.
  isValidRecipe(name: string, description: string): boolean {
    return name.trim() !== "" && description.trim() !== "";
  },

  // Prepare a recipe using the correct data structure.
  prepareRecipe(id: number, name: string, description: string): Recipe {
    return {
      id,
      name: name.trim(),
      description: description.trim(),
      ingredients: [],
    };
  },
};