import './App.css'
import RecipeList from './components/recipelist/recipelist'
import IngredientsList from './components/ingredients/ingredients'
import Reviews from './components/reviews/reviews'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>FoodieHub</h1>
        <p>Discover recipes, ingredients, and reviews</p>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/ingredients" element={<IngredientsList />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </main>

      <footer>
        <p>Created by Komal, Amrinder, and Muskan</p>
      </footer>
    </BrowserRouter>
  )
}

export default App