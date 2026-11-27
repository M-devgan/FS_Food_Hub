import type { Review } from "../types/Review";
import { reviewRepository } from "../repositories/reviewRepository";

export const reviewService = {
  // GET - Retrieve reviews from the backend
  async getReviews(): Promise<Review[]> {
    return reviewRepository.getAll();
  },

  // POST - Validate and save a new review
  async addReview(review: Review): Promise<Review> {
    if (
      review.recipeName.trim() === "" ||
      review.reviewer.trim() === "" ||
      review.comment.trim() === ""
    ) {
      throw new Error("Please fill in all fields.");
    }

    if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }

    return reviewRepository.create({
      recipeName: review.recipeName,
      reviewer: review.reviewer,
      rating: review.rating,
      comment: review.comment,
    });
  },

  // DELETE - Remove a review from the database
  async removeReview(id: number): Promise<void> {
    await reviewRepository.delete(id);
  },
};