import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Middleware to validate review data
export const validateReview = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = z.object({
    recipeName: z.string().trim().min(1),
    reviewer: z.string().trim().min(1),
    rating: z.number().int().min(1).max(5),
    comment: z.string().trim().min(1),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid review data",
      errors: result.error.flatten(),
    });
    return;
  }

  req.body = result.data;
  next();
};