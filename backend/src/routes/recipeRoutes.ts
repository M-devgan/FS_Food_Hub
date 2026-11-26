import { Router } from "express";
import {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

import { validateRequest } from "../middleware/validateRequest.js";
import {
  recipeSchema,
  recipeIdSchema,
} from "../validations/recipeSchema.js";

const router = Router();

// Get all recipes
router.get("/", getAllRecipes);

// Create a recipe (validate request body)
router.post("/", validateRequest(recipeSchema, "body"), createRecipe);

// Delete a recipe (validate recipe ID)
router.delete("/:id", validateRequest(recipeIdSchema, "params"), deleteRecipe);

export default router;