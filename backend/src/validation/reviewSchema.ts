import { z } from "zod";

// Validate data when creating a review
export const createReviewSchema = z.object({
  recipeName: z.string().trim().min(1, "Recipe name is required"),

  reviewer: z.string().trim().min(1, "Reviewer name is required"),

  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),

  comment: z.string().trim().min(1, "Comment is required"),
});

// Validate the review ID in the URL
export const reviewIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});