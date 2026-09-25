function Reviews() {
  const reviews = [
    {
      id: 1,
      recipeName: "Creamy Alfredo Pasta",
      reviewer: "Komal",
      rating: 5,
      comment: "Very creamy and delicious. I would make it again!",
    },
    {
      id: 2,
      recipeName: "Chicken Tacos",
      reviewer: "Amrinder",
      rating: 4,
      comment: "The tacos were delicious to make.",
    },
    {
      id: 3,
      recipeName: "Chocolate Cake",
      reviewer: "Muskan",
      rating: 5,
      comment: "The cake was soft, rich, and full of chocolate flavour!",
    },
  ];
 
  return (
<section className="reviews">
<h2>Recipe Reviews</h2>
 
      <div className="review-list">
        {reviews.map((review) => (
<article className="review-card" key={review.id}>
<h3>{review.recipeName}</h3>
<p>
<strong>{review.reviewer}</strong> — {review.rating}/5
</p>
<p>{review.comment}</p>
</article>
        ))}
</div>
</section>
  );
}
 
export default Reviews;