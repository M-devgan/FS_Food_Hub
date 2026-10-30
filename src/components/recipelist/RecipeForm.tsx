import { recipeRepository } from '../../repositories/recipeRepository'
import { useFormFields } from '../../hooks/useFormFields'
import { recipeService } from '../../services/recipeService'

type Recipe = {
  id: number
  name: string
  description: string
  ingredients: number[]
}

type RecipeFormProps = {
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}
/*
 * I.3 - Recipe Form Architecture
 *
 * Custom Hook: useFormFields manages form input values and resets them.
 * Service: recipeService validates input and prepares recipe data.
 * Repository: recipeRepository creates recipes and retrieves updated data.
 *
 * This separates presentation logic, business logic, and data access
 * so the component is easier to maintain and reuse.
 */
function RecipeForm({ setRecipes }: RecipeFormProps) {
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

    if (!recipeService.isValidRecipe(recipeName, recipeDescription)) {
      return
    }

    const newRecipe = recipeService.prepareRecipe(
      Date.now(),
      recipeName,
      recipeDescription
    )

    recipeRepository.create(newRecipe)
    setRecipes(recipeRepository.getAll())
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