import './App.css'
import RecipeList from './components/recipelist/recipelist'
import IngredientsList from './components/ingredients/ingredients'
import Reviews from './components/reviews/reviews'

function App() {
  return (
    <>
      <header>
        <h1>FoodieHub</h1>
        <p>Discover recipes, ingredients, and reviews</p>
      </header>

      <main>
        <RecipeList />
        <IngredientsList />
        <Reviews />
      </main>

      <footer>
        <p>Created by Komal, Amrinder, and Muskan</p>
      </footer>
    </>
  )
}

export default App