import type { Request, Response } from "express";

import {
  getAllReviews,
  addReview,
  removeReview,
} from "../services/reviewService.js";

// GET all reviews
export const getReviews = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({
      message: "Failed to get reviews",
    });
  }
};

// POST a new review
export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newReview = await addReview(req.body);

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      message: "Failed to create review",
    });
  }
};

// DELETE a review
export const deleteReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      message: "Invalid review ID",
    });
    return;
  }

  try {
    await removeReview(id);

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting review:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      res.status(404).json({
        message: "Review not found",
      });
      return;
    }

    res.status(500).json({
      message: "Failed to delete review",
    });
  }
};