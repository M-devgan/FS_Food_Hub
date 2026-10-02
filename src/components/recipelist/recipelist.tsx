import { useState } from 'react'
import RecipeForm from './RecipeForm'

// Props for the shared state from App.tsx
type RecipeListProps = {
  recipesCooked: number;
  setRecipesCooked: React.Dispatch<React.SetStateAction<number>>;
};

function RecipeList({
  recipesCooked,
  setRecipesCooked,
}: RecipeListProps) {

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Creamy Alfredo Pasta",
      description: "Creamy pasta made with cheese, garlic, and a rich sauce.",
      ingredients: [1, 2, 3, 4, 5],
    },
    {
      id: 2,
      name: "Chicken Tacos",
      description: "Soft tacos filled with seasoned chicken and fresh vegetables.",
      ingredients: [2, 6, 7, 8, 9],
    },
    {
      id: 3,
      name: "Chocolate Cake",
      description: "Soft chocolate cake with a rich and sweet chocolate flavour.",
      ingredients: [4, 10, 11, 12, 13, 14],
    },
  ]);

  return (
    <section className="recipe-list">
      <h2>Popular Recipes</h2>

      {/* Display and modify the shared state */}
      <div className="shared-state">
        <p>Recipes Cooked: {recipesCooked}</p>

        <button
          type="button"
          onClick={() => setRecipesCooked(recipesCooked + 1)}
        >
          Add One
        </button>
      </div>

      <RecipeForm
        recipes={recipes}
        setRecipes={setRecipes}
      />

      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <article className="recipe-card" key={recipe.id}>
            <div className="recipe-image">
              <span>🍽️</span>
            </div>

            <div className="recipe-content">
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>

              <button type="button">
                View Recipe
              </button>

              <button
                type="button"
                onClick={() =>
                  setRecipes(
                    recipes.filter(
                      (item) => item.id !== recipe.id
                    )
                  )
                }
              >
                Remove Recipe
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecipeList;