import { Router } from "express";
import {
  getAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";


import { validateRequest } from "../middleware/validateRequest.js";
import {
  recipeSchema,
  recipeIdSchema,
  updateRecipeSchema,
} from "../validations/recipeSchema.js";

const router = Router();

// Get all recipes
router.get("/", getAllRecipes);

// Create a recipe (validate request body)
router.post("/", validateRequest(recipeSchema, "body"), createRecipe);

// Update a recipe (validate ID and request body)
router.put(
  "/:id",
  validateRequest(recipeIdSchema, "params"),
  validateRequest(updateRecipeSchema, "body"),
  updateRecipe
);

// Delete a recipe (validate recipe ID)
router.delete("/:id", validateRequest(recipeIdSchema, "params"), deleteRecipe);

export default router;