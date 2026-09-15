// Ingredients component for displaying ingredients for each recipe
function IngredientsList() {

  // Mock data for the ingredients section
  // recipeId connects each item to a recipe in the Recipe List
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

  // Return the Ingredients section that will be displayed on the page
  return (
    <section className="ingredients-list">
      <h2>Recipe Ingredients</h2>

      <div className="ingredient-cards">

        {/* Loop through the ingredients array and create a card for each item */}
        {ingredients.map((ingredient) => (
          <article className="ingredient-card" key={ingredient.id}>

            {/* Placeholder image/icon for the ingredient card */}
            <div className="ingredient-image">
              <span>🥗</span>
            </div>

            {/* Display the recipe name and its ingredients */}
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

// Export the component so it can be imported and used in App.tsx
export default IngredientsList;