function IngredientsList() {
  const ingredients = [
    {
      id: 1,
      recipeId: 1,
      name: "Creamy Alfredo Pasta",
      description: "Pasta, cheese, garlic, butter, and cream.",
    },
    {
      id: 2,
      recipeId: 2,
      name: "Chicken Tacos",
      description: "Chicken, tortillas, lettuce, tomatoes, and cheese.",
    },
    {
      id: 3,
      recipeId: 3,
      name: "Chocolate Cake",
      description: "Flour, cocoa powder, sugar, eggs, butter, and milk.",
    },
  ];

  return (
    <section className="ingredients-list">
      <h2>Recipe Ingredients</h2>

      <div className="ingredient-cards">
        {ingredients.map((ingredient) => (
          <article className="ingredient-card" key={ingredient.id}>
            <div className="ingredient-image">
              <span>🥗</span>
            </div>

            <div className="ingredient-content">
              <h3>{ingredient.name}</h3>
              <p>{ingredient.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default IngredientsList;