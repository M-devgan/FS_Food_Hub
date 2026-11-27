import type { Request, Response, NextFunction } from "express";
import * as ingredientService from "../services/ingredientService.js";

// Get all ingredients
export const getAllIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredients = await ingredientService.getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

// Get ingredient by ID
export const getIngredientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const ingredient = await ingredientService.getIngredientById(id);

    if (!ingredient) {
      res.status(404).json({ message: "Ingredient not found" });
      return;
    }

    res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
};

// Create ingredient
export const createIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, characteristics } = req.body;

    const ingredient = await ingredientService.createIngredient(
      name,
      characteristics
    );

    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
};

// Update ingredient
export const updateIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { name, characteristics } = req.body;

    const existing = await ingredientService.getIngredientById(id);

    if (!existing) {
      res.status(404).json({ message: "Ingredient not found" });
      return;
    }

    const ingredient = await ingredientService.updateIngredient(
      id,
      name,
      characteristics
    );

    res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
};

// Delete ingredient
export const deleteIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const existing = await ingredientService.getIngredientById(id);

    if (!existing) {
      res.status(404).json({ message: "Ingredient not found" });
      return;
    }

    await ingredientService.deleteIngredient(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};