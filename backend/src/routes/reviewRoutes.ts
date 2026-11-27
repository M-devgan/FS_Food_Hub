import { Router } from "express";
import { validateReview } from "../validation/validateReview.js";

import {
  getReviews,
  createReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = Router();

// GET all reviews
router.get("/", getReviews);

// POST a new review (with validation)
router.post("/", validateReview, createReview);

// DELETE a review
router.delete("/:id", deleteReview);

export default router;