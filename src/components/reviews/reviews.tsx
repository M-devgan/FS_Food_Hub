import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { useReviews } from "../../hooks/useReviews";

// Props for the shared state from App.tsx
type ReviewsProps = {
  recipesCooked: number;
  setRecipesCooked: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * Reviews uses the useReviews custom hook to manage review presentation state.
 * The hook uses the Review service, which handles business logic.
 * The service uses the Review repository for data access.
 * This separates presentation, business, and data access concerns.
 */
function Reviews({
  recipesCooked,
  setRecipesCooked,
}: ReviewsProps) {
  const { reviews, addReview, removeReview } = useReviews();

  return (
    <section className="reviews">
      <h2>Recipe Reviews</h2>

      {/* Display and modify the shared state */}
      <div className="shared-state">
        <p>Recipes Cooked: {recipesCooked}</p>

        <button
          type="button"
          onClick={() => setRecipesCooked(recipesCooked + 1)}
        >
          Add One
        </button>
      </div>

      <ReviewForm addReview={addReview} />

      <div className="review-list">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            recipeName={review.recipeName}
            reviewer={review.reviewer}
            rating={review.rating}
            comment={review.comment}
            removeReview={removeReview}
          />
        ))}
      </div>
    </section>
  );
}

export default Reviews;