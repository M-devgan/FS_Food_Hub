// Ingredients component for displaying ingredients for each recipe
function IngredientsList() {

  // Mock data for the ingredients section
  // recipeId connects each ingredient to a recipe in the Recipe List
   const ingredients = [
  // Creamy Alfredo Pasta - Recipe ID 1
  {
    id: 1,
    recipeId: 1,
    name: "Pasta",
    characteristics: "Soft when cooked and made from wheat",
  },
  {
    id: 2,
    recipeId: 1,
    name: "Cheese",
    characteristics: "Dairy product, creamy and melty",
  },
  {
    id: 3,
    recipeId: 1,
    name: "Garlic",
    characteristics: "Aromatic ingredient with a strong flavour",
  },
  {
    id: 4,
    recipeId: 1,
    name: "Butter",
    characteristics: "Creamy dairy product used for cooking",
  },
  {
    id: 5,
    recipeId: 1,
    name: "Cream",
    characteristics: "Rich dairy product with a smooth texture",
  },

  // Chicken Tacos - Recipe ID 2
  {
    id: 6,
    recipeId: 2,
    name: "Chicken",
    characteristics: "Protein that is tender when cooked",
  },
  {
    id: 7,
    recipeId: 2,
    name: "Tortillas",
    characteristics: "Soft flatbread used to hold taco fillings",
  },
  {
    id: 8,
    recipeId: 2,
    name: "Lettuce",
    characteristics: "Fresh, green and crunchy vegetable",
  },
  {
    id: 9,
    recipeId: 2,
    name: "Tomatoes",
    characteristics: "Fresh, juicy and slightly sweet",
  },
  {
    id: 10,
    recipeId: 2,
    name: "Cheese",
    characteristics: "Dairy product with a creamy flavour",
  },

  // Chocolate Cake - Recipe ID 3
  {
    id: 11,
    recipeId: 3,
    name: "Flour",
    characteristics: "Dry ingredient that provides structure",
  },
  {
    id: 12,
    recipeId: 3,
    name: "Cocoa Powder",
    characteristics: "Dry ingredient with a rich chocolate flavour",
  },
  {
    id: 13,
    recipeId: 3,
    name: "Sugar",
    characteristics: "Sweetener used in baking",
  },
  {
    id: 14,
    recipeId: 3,
    name: "Eggs",
    characteristics: "Helps bind ingredients together",
  },
  {
    id: 15,
    recipeId: 3,
    name: "Butter",
    characteristics: "Adds richness and moisture",
  },
  {
    id: 16,
    recipeId: 3,
    name: "Milk",
    characteristics: "Liquid dairy product that adds moisture",
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