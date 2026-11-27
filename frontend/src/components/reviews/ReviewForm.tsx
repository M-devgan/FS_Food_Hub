import { useState } from "react";
import type { Review } from "../../types/Review";
import { useFormFields } from "../../hooks/useFormFields";

type ReviewFormProps = {
  addReview: (review: Review) => Promise<void>;
};

/**
 * ReviewForm manages the form inputs using the useFormFields hook.
 *
 * When submitted, the review is passed to the useReviews hook,
 * which calls the service and repository to save it in PostgreSQL
 * through the backend API.
 */
function ReviewForm({ addReview }: ReviewFormProps) {
  const recipeName = useFormFields("");
  const reviewer = useFormFields("");
  const comment = useFormFields("");

  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Submit a new review to the backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (
      recipeName.value.trim() === "" ||
      reviewer.value.trim() === "" ||
      comment.value.trim() === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate rating
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    const newReview: Review = {
      id: 0, // PostgreSQL generates the actual ID
      recipeName: recipeName.value.trim(),
      reviewer: reviewer.value.trim(),
      rating,
      comment: comment.value.trim(),
    };

    try {
      setIsSubmitting(true);

      // Wait for the backend to save the review
      await addReview(newReview);

      // Clear the form after successful submission
      recipeName.resetValue();
      reviewer.resetValue();
      comment.resetValue();
      setRating(5);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save review. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Review</h3>

      <label>
        Recipe Name:
        <input
          type="text"
          value={recipeName.value}
          onChange={(e) => recipeName.setValue(e.target.value)}
          placeholder="Enter recipe name"
          disabled={isSubmitting}
        />
      </label>

      <div className="review-name-rating">
        <label>
          Your Name:
          <input
            type="text"
            value={reviewer.value}
            onChange={(e) => reviewer.setValue(e.target.value)}
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
        </label>

        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            disabled={isSubmitting}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
      </div>

      <label>
        Comment:
        <textarea
          value={comment.value}
          onChange={(e) => comment.setValue(e.target.value)}
          placeholder="Enter your review"
          rows={4}
          disabled={isSubmitting}
        />
      </label>

      {/* Display validation or API errors */}
      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Add Review"}
      </button>
    </form>
  );
}

export default ReviewForm;