import { useEffect, useState } from "react";
import type { Review } from "../types/Review";
import { reviewService } from "../services/reviewService";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // GET - Load saved reviews from PostgreSQL
  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      try {
        const savedReviews = await reviewService.getReviews();

        if (active) {
          setReviews(savedReviews);
        }
      } catch (err) {
        if (active) {
          setError("Failed to load reviews.");
          console.error(err);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadReviews();

    return () => {
      active = false;
    };
  }, []);

  // POST - Add a review to PostgreSQL
  const addReview = async (review: Review): Promise<void> => {
    try {
      setError(null);

      const savedReview = await reviewService.addReview(review);

      setReviews((previousReviews) => [
        ...previousReviews,
        savedReview,
      ]);
    } catch (err) {
      setError("Failed to add review.");
      console.error(err);
    }
  };

  // DELETE - Remove a review from PostgreSQL
  const removeReview = async (id: number): Promise<void> => {
    try {
      setError(null);

      await reviewService.removeReview(id);

      setReviews((previousReviews) =>
        previousReviews.filter((review) => review.id !== id)
      );
    } catch (err) {
  setError("Failed to add review.");
  console.error(err);
  throw err;
}
  };

  return {
    reviews,
    addReview,
    removeReview,
    loading,
    error,
  };
}