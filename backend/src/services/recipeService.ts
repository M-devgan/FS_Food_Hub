import { prisma } from "../prismaClient.js";
import type {
  Recipe as RecipeRecord,
  RecipeIngredient,
} from "../generated/prisma/client.js";

type RecipeWithIngredients = RecipeRecord & {
  recipeIngredients: RecipeIngredient[];
};

export const recipeService = {
  // Get all recipes
  async getAllRecipes() {
    const recipes: RecipeWithIngredients[] = await prisma.recipe.findMany({
      include: {
        recipeIngredients: true,
      },
    });

    return recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.recipeIngredients.map(
        (item: RecipeIngredient) => item.ingredientId
      ),
    }));
  },

  // Create a new recipe
  async createRecipe(
    name: string,
    description: string,
    ingredients: number[] = []
  ) {
    const recipe: RecipeWithIngredients = await prisma.recipe.create({
      data: {
        name,
        description,
        recipeIngredients: {
          create: ingredients.map((ingredientId) => ({
            ingredient: {
              connect: { id: ingredientId },
            },
          })),
        },
      },
      include: {
        recipeIngredients: true,
      },
    });

    return {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.recipeIngredients.map(
        (item: RecipeIngredient) => item.ingredientId
      ),
    };
  },

  // Delete a recipe
  async deleteRecipe(id: number) {
    return prisma.recipe.delete({
      where: { id },
    });
  },
};