import type { Ingredient } from "../types/Ingredient";

const API_URL = "http://localhost:3000/api/ingredients";

type IngredientInput = Pick<Ingredient, "name" | "characteristics">;

type IngredientResponse = IngredientInput & {
  id: number;
  recipes?: number[];
};

function mapIngredient(data: IngredientResponse): Ingredient {
  return {
    ...data,
    recipes: data.recipes ?? [],
  };
}

export const ingredientRepository = {
  async getAll(): Promise<Ingredient[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch ingredients");
    }

    const data: IngredientResponse[] = await response.json();
    return data.map(mapIngredient);
  },

  async getById(id: number): Promise<Ingredient | undefined> {
    const response = await fetch(`${API_URL}/${id}`);

    if (response.status === 404) {
      return undefined;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch ingredient");
    }

    return mapIngredient(await response.json());
  },

  async create(ingredient: IngredientInput): Promise<Ingredient> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    });

    if (!response.ok) {
      throw new Error("Failed to create ingredient");
    }

    return mapIngredient(await response.json());
  },

  async update(
    id: number,
    ingredient: IngredientInput
  ): Promise<Ingredient> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    });

    if (!response.ok) {
      throw new Error("Failed to update ingredient");
    }

    return mapIngredient(await response.json());
  },

  async remove(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to remove ingredient");
    }

    return true;
  },
};