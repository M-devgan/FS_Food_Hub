import { useState } from "react";
import ReviewForm from "./ReviewForm";

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
      comment:
        "The chicken was flavourful and the tacos were simple to prepare. A little more seasoning or spice could improve the overall taste.",
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
          <article className="review-card" key={review.id}>
            <h3>{review.recipeName}</h3>

            <p>
              <strong>{review.reviewer}</strong> — {review.rating}/5
            </p>

            <p>{review.comment}</p>

            <button onClick={() => removeReview(review.id)}>
              Remove Review
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;