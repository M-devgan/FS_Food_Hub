import { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

type Review = {
  id: number;
  recipeName: string;
  reviewer: string;
  rating: number;
  comment: string;
};

function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      recipeName: "Creamy Alfredo Pasta",
      reviewer: "Komal",
      rating: 5,
      comment:
        "The pasta was creamy, rich, and full of flavour. Adding mushrooms or some fresh vegetables could make the dish even more enjoyable.",
    },
    {
      id: 2,
      recipeName: "Chicken Tacos",
      reviewer: "Amrinder",
      rating: 4,
    },
    {
      id: 3,
      recipeName: "Chocolate Cake",
      reviewer: "Muskan",
      rating: 5,
      comment:
        "The cake was soft, moist, and had a rich chocolate flavour. Fresh strawberries or a light topping would be a great addition.",
    },
  ]);

  const removeReview = (id: number) => {
    const updatedReviews = reviews.filter(
      (review) => review.id !== id
    );

    setReviews(updatedReviews);
  };

  return (
    <section className="reviews">
      <h2>Recipe Reviews</h2>

      <ReviewForm
        reviews={reviews}
        setReviews={setReviews}
      />

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