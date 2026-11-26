import type { Request, Response } from "express";
import { recipeService } from "../services/recipeService.js";

// GET: Retrieve all recipes
export const getAllRecipes = async (_req: Request, res: Response) => {
  try {
    const recipes = await recipeService.getAllRecipes();

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    res.status(500).json({ message: "Failed to retrieve recipes" });
  }
};

// POST: Create a new recipe
export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { name, description, ingredients } = req.body;

    const recipe = await recipeService.createRecipe(
      name,
      description,
      ingredients
    );

    return res.status(201).json(recipe);

  } catch (error) {
    console.error("Error creating recipe:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(400).json({
        message: "One or more ingredients do not exist",
      });
    }

    return res.status(500).json({
      message: "Failed to create recipe",
    });
  }
};

// DELETE: Remove a recipe
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await recipeService.deleteRecipe(id);

    return res.status(200).json({
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);

    // Prisma error P2025 means the requested record was not found
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    return res.status(500).json({
      message: "Failed to delete recipe",
    });
  }
};