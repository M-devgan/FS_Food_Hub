import type { Review } from "../types/Review";

const API_URL = "http://localhost:3000/api/reviews";

export const reviewRepository = {
  // GET - Fetch all reviews from PostgreSQL
  async getAll(): Promise<Review[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return response.json();
  },

  // POST - Save a new review to PostgreSQL
  async create(review: Omit<Review, "id">): Promise<Review> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error("Failed to create review");
    }

    return response.json();
  },

  // DELETE - Remove a review from PostgreSQL
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
  },
};