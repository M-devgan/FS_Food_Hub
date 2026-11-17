import type { Review } from "../types/Review";
import { reviewsData } from "../data/reviewsData";

let reviews: Review[] = [...reviewsData];

export const reviewRepository = {
  // READ - Get all reviews
  getAll(): Review[] {
    return reviews;
  },

  // READ - Get one review by its ID
  getById(id: number): Review | undefined {
    return reviews.find((review) => review.id === id);
  },

  // CREATE - Add a new review
  create(review: Review): Review {
    reviews.push(review);
    return review;
  },

  // UPDATE - Update an existing review
  update(id: number, updatedReview: Review): Review | undefined {
    const index = reviews.findIndex((review) => review.id === id);

    if (index === -1) {
      return undefined;
    }

    reviews[index] = updatedReview;
    return reviews[index];
  },

  // DELETE - Remove a review
  delete(id: number): boolean {
    const originalLength = reviews.length;

    reviews = reviews.filter((review) => review.id !== id);

    return reviews.length < originalLength;
  },
};