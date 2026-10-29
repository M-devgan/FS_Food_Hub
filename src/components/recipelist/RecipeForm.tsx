import { useFormFields } from '../../hooks/useFormFields'

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
const {
  value: recipeName,
  setValue: setRecipeName,
  resetValue: resetRecipeName,
} = useFormFields('')

const {
  value: recipeDescription,
  setValue: setRecipeDescription,
  resetValue: resetRecipeDescription,
} = useFormFields('')

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
    resetRecipeName()
    resetRecipeDescription()
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