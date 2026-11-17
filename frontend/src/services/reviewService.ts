import type { Review } from "../types/Review";
import { reviewRepository } from "../repositories/reviewRepository";

export const reviewService = {
  getReviews(): Review[] {
    return reviewRepository.getAll();
  },

  addReview(review: Review): Review {
    if (
      review.recipeName.trim() === "" ||
      review.reviewer.trim() === "" ||
      review.comment.trim() === ""
    ) {
      throw new Error("Please fill in all fields.");
    }

    if (review.rating < 1 || review.rating > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }

    return reviewRepository.create(review);
  },

  removeReview(id: number): boolean {
    return reviewRepository.delete(id);
  },
};