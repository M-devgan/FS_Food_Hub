import { useState } from "react";

type Review = {
  id: number;
  recipeName: string;
  reviewer: string;
  rating: number;
  comment: string;
};

type ReviewFormProps = {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
};

function ReviewForm({ reviews, setReviews }: ReviewFormProps) {
  const [recipeName, setRecipeName] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      recipeName.trim() === "" ||
      reviewer.trim() === "" ||
      comment.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      recipeName: recipeName,
      reviewer: reviewer,
      rating: rating,
      comment: comment,
    };

    setReviews([...reviews, newReview]);

    setRecipeName("");
    setReviewer("");
    setRating(5);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Review</h3>

      <label>
        Recipe Name:
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
      </label>

      <label>
        Your Name:
        <input
          type="text"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
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

      <label>
        Comment:
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>

      <button type="submit">Add Review</button>
    </form>
  );
}

export default ReviewForm;