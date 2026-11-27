import { useEffect, useState } from 'react'
import RecipeForm from './RecipeForm'
import { recipeRepository } from '../../repositories/recipeRepository'
import { useCookingStats } from '../../hooks/useCookingStats'
import type { Recipe } from '../../types/Recipe'

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [editingRecipeId, setEditingRecipeId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const { recipesCooked, addRecipeCooked } = useCookingStats()

  // Load recipes from the backend
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await recipeRepository.getAll()
        setRecipes(data)
      } catch (error) {
        console.error("Error loading recipes:", error)
      }
    }

    loadRecipes()
  }, [])

  // Delete a recipe
  const handleDelete = async (id: number) => {
    try {
      await recipeRepository.delete(id)

      const updatedRecipes = await recipeRepository.getAll()
      setRecipes(updatedRecipes)
    } catch (error) {
      console.error("Error deleting recipe:", error)
      alert("Failed to delete recipe. Please try again.")
    }
  }

  // Start editing a recipe
  const handleEdit = (recipe: Recipe) => {
    setEditingRecipeId(recipe.id)
    setEditName(recipe.name)
    setEditDescription(recipe.description)
  }

  // Save recipe updates
  const handleUpdate = async (id: number) => {
    if (!editName.trim() || !editDescription.trim()) {
      alert("Recipe name and description are required.")
      return
    }

    try {
      await recipeRepository.update(id, {
        name: editName.trim(),
        description: editDescription.trim(),
      })

      const updatedRecipes = await recipeRepository.getAll()
      setRecipes(updatedRecipes)
      setEditingRecipeId(null)
    } catch (error) {
      console.error("Error updating recipe:", error)
      alert("Failed to update recipe. Please try again.")
    }
  }

  return (
    <section className="recipe-list">
      <h2>Popular Recipes</h2>

      <div className="shared-state">
        <p>Recipes Cooked: {recipesCooked}</p>

        <button type="button" onClick={addRecipeCooked}>
          Add One
        </button>
      </div>

      <RecipeForm setRecipes={setRecipes} />

      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <article className="recipe-card" key={recipe.id}>
            <div className="recipe-image">
              <span>🍽️</span>
            </div>

            <div className="recipe-content">
              {editingRecipeId === recipe.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    placeholder="Recipe name"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(event) =>
                      setEditDescription(event.target.value)
                    }
                    placeholder="Recipe description"
                  />

                  <button
                    type="button"
                    onClick={() => handleUpdate(recipe.id)}
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingRecipeId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>

                  <button type="button">
                    View Recipe
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEdit(recipe)}
                  >
                    Edit Recipe
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Remove Recipe
                  </button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecipeList