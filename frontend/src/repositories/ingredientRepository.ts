import type { Ingredient } from "../types/Ingredient";
import { ingredientsData } from "../data/ingredientsData";

let ingredients: Ingredient[] = [...ingredientsData];

export const ingredientRepository = {
  // READ: Get all ingredients
  getAll(): Ingredient[] {
    return [...ingredients];
  },

  // READ: Get one ingredient by ID
  getById(id: number): Ingredient | undefined {
    return ingredients.find((ingredient) => ingredient.id === id);
  },

  // CREATE: Add a new ingredient
  create(ingredient: Ingredient): Ingredient {
    ingredients.push(ingredient);
    return ingredient;
  },

  // UPDATE: Update an existing ingredient
  update(id: number, updatedIngredient: Partial<Ingredient>): Ingredient | undefined {
    const index = ingredients.findIndex((ingredient) => ingredient.id === id);

    if (index === -1) {
      return undefined;
    }

    ingredients[index] = {
      ...ingredients[index],
      ...updatedIngredient,
      id,
    };

    return ingredients[index];
  },

  // DELETE: Remove an ingredient
  remove(id: number): boolean {
    const originalLength = ingredients.length;

    ingredients = ingredients.filter((ingredient) => ingredient.id !== id);

    return ingredients.length < originalLength;
  },
};