import { Router } from "express";
import * as ingredientController from "../controllers/ingredientController.js";
import {
  validateBody,
  validateId,
} from "../middleware/ingredientValidation.js";

const router = Router();

// Get all ingredients
router.get("/", ingredientController.getAllIngredients);

// Get ingredient by ID
router.get("/:id", validateId, ingredientController.getIngredientById);

// Create ingredient
router.post("/", validateBody, ingredientController.createIngredient);

// Update ingredient
router.put("/:id", validateId, validateBody, ingredientController.updateIngredient);

// Delete ingredient
router.delete("/:id", validateId, ingredientController.deleteIngredient);

export default router;