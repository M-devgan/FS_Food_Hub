import type { Recipe } from "../types/Recipe";

const API_URL = "http://localhost:3000/api/recipes";

export const recipeRepository = {
  // GET: Retrieve all recipes from the backend
  async getAll(): Promise<Recipe[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to retrieve recipes");
    }

    return response.json();
  },

  // POST: Create a recipe in the database
  async create(recipe: Omit<Recipe, "id">): Promise<Recipe> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error("Failed to create recipe");
    }

    return response.json();
  },

  // DELETE: Remove a recipe from the database
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete recipe");
    }
  },
};