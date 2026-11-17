import { useState } from "react";
import type { Review } from "../types/Review";
import { reviewService } from "../services/reviewService";

/**
 * Custom hook for managing Review presentation state.
 *
 * Returns:
 * reviews - the reviews displayed by the UI.
 * addReview - adds a review through the Review service.
 * removeReview - removes a review through the Review service.
 */
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(() =>
    reviewService.getReviews()
  );

  const addReview = (review: Review) => {
    reviewService.addReview(review);
    setReviews([...reviewService.getReviews()]);
  };

  const removeReview = (id: number) => {
    reviewService.removeReview(id);
    setReviews([...reviewService.getReviews()]);
  };

  return {
    reviews,
    addReview,
    removeReview,
  };
}