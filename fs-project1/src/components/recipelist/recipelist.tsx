function RecipeList() {
  const recipes = [
    {
      id: 1,
      name: "Creamy Alfredo Pasta",
      description: "Creamy pasta made with cheese, garlic, and a rich sauce.",
    },
    {
      id: 2,
      name: "Chicken Tacos",
      description: "Soft tacos filled with seasoned chicken and fresh vegetables.",
    },
    {
      id: 3,
      name: "Chocolate Cake",
      description: "Soft chocolate cake with a rich and sweet chocolate flavour.",
    },
  ];

  return (
    <section className="recipe-list">
      <h2>Popular Recipes</h2>

      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <article className="recipe-card" key={recipe.id}>
            <div className="recipe-image">
              <span>🍽️</span>
            </div>

            <div className="recipe-content">
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <button type="button">View Recipe</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecipeList;

 