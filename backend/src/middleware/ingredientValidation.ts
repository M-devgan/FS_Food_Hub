import type { Request, Response, NextFunction } from "express";
import {
  validateIngredientBody,
  validateIngredientId,
} from "../validation/ingredientSchema.js";

// Validate request body
export const validateBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validateIngredientBody(req.body)) {
    res.status(400).json({
      message: "Name and characteristics are required",
    });
    return;
  }

  next();
};

// Validate request ID
export const validateId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validateIngredientId(req.params.id)) {
    res.status(400).json({
      message: "Invalid ingredient ID",
    });
    return;
  }

  next();
};