import { useState } from 'react'

type Recipe = {
  id: number
  name: string
  description: string
  ingredients: number[]
}

type RecipeFormProps = {
  recipes: Recipe[]
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}

function RecipeForm({ recipes, setRecipes }: RecipeFormProps) {
  const [recipeName, setRecipeName] = useState('')
  const [recipeDescription, setRecipeDescription] = useState('')

  const addRecipe = (event: React.FormEvent) => {
    event.preventDefault()

    if (recipeName.trim() === '' || recipeDescription.trim() === '') {
      return
    }

    const newRecipe = {
      id: Date.now(),
      name: recipeName,
      description: recipeDescription,
      ingredients: [],
    }

    setRecipes([...recipes, newRecipe])
    setRecipeName('')
    setRecipeDescription('')
  }

  return (
    <form onSubmit={addRecipe}>
      <h3>Add Recipe</h3>
      
      <div>
        <label htmlFor="recipeName">Recipe Name:</label>
        <input
          id="recipeName"
          type="text"
          value={recipeName}
          onChange={(event) => setRecipeName(event.target.value)}
          placeholder="Enter recipe name"
        />
      </div>

      <div>
        <label htmlFor="recipeDescription">Description:</label>
        <textarea
            id="recipeDescription"
            value={recipeDescription}
            onChange={(event) => setRecipeDescription(event.target.value)}
            placeholder="Enter recipe description"
            rows={4}
        />
      </div>

      <button type="submit">Add Recipe</button>
    </form>
  )
}

export default RecipeForm