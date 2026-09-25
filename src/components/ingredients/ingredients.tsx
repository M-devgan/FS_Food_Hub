// Ingredients component for displaying ingredients for each recipe
function IngredientsList() {

  // Mock data for the ingredients section
  // recipes contains the IDs of the recipes that use each ingredient
  const ingredients = [
    {
      id: 1,
      name: "Pasta",
      characteristics: "Soft when cooked and made from wheat",
      recipes: [1],
    },
    {
      id: 2,
      name: "Cheese",
      characteristics: "Dairy product, creamy and melty",
      recipes: [1, 2],
    },
    {
      id: 3,
      name: "Garlic",
      characteristics: "Aromatic ingredient with a strong flavour",
      recipes: [1],
    },
    {
      id: 4,
      name: "Butter",
      characteristics: "Creamy dairy product used for cooking",
      recipes: [1, 3],
    },
    {
      id: 5,
      name: "Cream",
      characteristics: "Rich dairy product with a smooth texture",
      recipes: [1],
    },
    {
      id: 6,
      name: "Chicken",
      characteristics: "Protein that is tender when cooked",
      recipes: [2],
    },
    {
      id: 7,
      name: "Tortillas",
      characteristics: "Soft flatbread used to hold taco fillings",
      recipes: [2],
    },
    {
      id: 8,
      name: "Lettuce",
      characteristics: "Fresh, green and crunchy vegetable",
      recipes: [2],
    },
    {
      id: 9,
      name: "Tomatoes",
      characteristics: "Fresh, juicy and slightly sweet",
      recipes: [2],
    },
    {
      id: 10,
      name: "Flour",
      characteristics: "Dry ingredient that provides structure",
      recipes: [3],
    },
    {
      id: 11,
      name: "Cocoa Powder",
      characteristics: "Dry ingredient with a rich chocolate flavour",
      recipes: [3],
    },
    {
      id: 12,
      name: "Sugar",
      characteristics: "Sweetener used in baking",
      recipes: [3],
    },
    {
      id: 13,
      name: "Eggs",
      characteristics: "Helps bind ingredients together",
      recipes: [3],
    },
    {
      id: 14,
      name: "Milk",
      characteristics: "Liquid dairy product that adds moisture",
      recipes: [3],
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

            {/* Placeholder icon for the ingredient card */}
            <div className="ingredient-image">
              <span>🥗</span>
            </div>

            {/* Display the ingredient name and characteristics */}
            <div className="ingredient-content">
              <h3>{ingredient.name}</h3>
              <p>{ingredient.characteristics}</p>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
}

// Export the component so it can be imported and used in App.tsx
export default IngredientsList;