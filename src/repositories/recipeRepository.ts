import type { Recipe } from "../types/Recipe";
import { recipesData } from "../data/recipesData";

// Start with the premade recipes from our data file
let recipes: Recipe[] = [...recipesData];

export const recipeRepository = {
  // READ: Get all recipes
  getAll(): Recipe[] {
    return [...recipes];
  },

  // READ: Get one recipe by ID
  getById(id: number): Recipe | undefined {
    return recipes.find((recipe) => recipe.id === id);
  },

  // CREATE: Add a new recipe
  create(recipe: Recipe): Recipe {
    recipes.push(recipe);
    return recipe;
  },

  // UPDATE: Update an existing recipe
  update(id: number, updatedRecipe: Partial<Recipe>): Recipe | undefined {
    const index = recipes.findIndex((recipe) => recipe.id === id);

    if (index === -1) {
      return undefined;
    }

    recipes[index] = { ...recipes[index], ...updatedRecipe, id };
    return recipes[index];
  },

  // DELETE: Remove a recipe
  delete(id: number): boolean {
    const originalLength = recipes.length;
    recipes = recipes.filter((recipe) => recipe.id !== id);

    return recipes.length < originalLength;
  },
};