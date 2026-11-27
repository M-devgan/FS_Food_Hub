type ReviewCardProps = {
  id: number;
  recipeName: string;
  reviewer: string;
  rating: number;
  comment: string;
  removeReview: (id: number) => void;
};

function ReviewCard({
  id,
  recipeName,
  reviewer,
  rating,
  comment,
  removeReview,
}: ReviewCardProps) {
  return (
    <article className="review-card">
      <h3>{recipeName}</h3>

      <p>
        <strong>{reviewer}</strong> — {rating}/5
      </p>

      <p>{comment}</p>

      <button onClick={() => removeReview(id)}>
        Remove Review
      </button>
    </article>
  );
}

export default ReviewCard;