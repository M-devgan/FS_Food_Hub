import { useState } from "react";
import type { Review } from "../../types/Review";
import { useFormFields } from "../../hooks/useFormFields";

type ReviewFormProps = {
  addReview: (review: Review) => void;
};

/**
 * ReviewForm uses the useFormFields custom hook to manage reusable
 * presentation logic for the form inputs.
 *
 * When the form is submitted, the new Review is passed to addReview.
 * The Review service handles business validation and the repository
 * handles the Review data.
 */
function ReviewForm({ addReview }: ReviewFormProps) {
  const recipeName = useFormFields("");
  const reviewer = useFormFields("");
  const comment = useFormFields("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: Review = {
      id: Date.now(),
      recipeName: recipeName.value,
      reviewer: reviewer.value,
      rating,
      comment: comment.value,
    };

    try {
      addReview(newReview);

      recipeName.resetValue();
      reviewer.resetValue();
      comment.resetValue();
      setRating(5);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
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
          />
        </label>

        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
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
        />
      </label>

      <button type="submit">Add Review</button>
    </form>
  );
}

export default ReviewForm;