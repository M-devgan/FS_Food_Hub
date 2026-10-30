# Recipes Architecture Documentation

## 1. Overview

This document explains the architecture used for the Recipes feature in the FoodieHub application.

The purpose of this architecture is to keep presentation logic, business logic, and data access logic separate.

The Recipes feature uses a custom hook to manage form input values, a service to handle recipe validation and preparation, and a repository to manage recipe data. These are integrated into the Recipes components as part of Sprint 3.

This structure helps keep the code organized, reusable, and easier to maintain.

## 2. Custom Hook

### Hook Name: useFormFields

**File:** `src/hooks/useFormFields.ts`

**Purpose:**

The `useFormFields` custom hook manages form input values. It allows different components to reuse the same input-handling logic.

**How It Works:**

* `value`: Stores the current value entered in an input field.
* `setValue`: Updates the input value when the user types.
* `resetValue`: Resets the input field to its initial value.

**Logic Separation:**

I created this hook because the Recipe Form and Ingredient Form both needed similar input state management. Instead of repeating the same logic, I moved it into a reusable hook.

The hook only handles presentation-related form state. It does not contain business logic or access the repository.

**Where and How It Is Used:**

* `RecipeForm.tsx`: Manages recipe name and description inputs and resets them after adding a recipe.
* `IngredientForm.tsx`: Manages ingredient name and characteristics inputs and resets them after adding an ingredient.

## 3. Service

### Service Name: recipeService

**File:** `src/services/recipeService.ts`

**Purpose:**

The `recipeService` handles business logic for the Recipes feature. It validates recipe information and prepares recipe objects before they are saved.

**How It Works:**

* `isValidRecipe()`: Checks that the recipe name and description are not empty.
* `prepareRecipe()`: Creates a recipe object with an ID, name, description, and empty ingredients array. It also removes extra spaces from the name and description.

**Logic Separation:**

I created this service to keep recipe validation and preparation logic separate from React components.

The service handles business rules, while the custom hook manages form inputs and the repository handles data access.

**Where and How It Is Used:**

* `RecipeForm.tsx` calls `isValidRecipe()` to validate the recipe name and description.
* After validation, `RecipeForm.tsx` calls `prepareRecipe()` to prepare the recipe object.
* The prepared recipe is then saved using `recipeRepository.create()`.


## 4. Repository

### Repository Name: recipeRepository

**File:** `src/repositories/recipeRepository.ts`

**Purpose:**

The `recipeRepository` manages recipe data for the FoodieHub application. It provides basic CRUD operations:

* Retrieve recipe information.
* Add new recipes.
* Update existing recipes.
* Delete recipes.

**Test Data:**

The repository imports recipe test data from `src/data/recipesData.ts`, which contains 10 recipe objects following the Recipe TypeScript type.

**Logic Separation:**

I created the repository to keep data access logic separate from React components. The repository handles recipe data operations, while presentation logic belongs in components or custom hooks and business logic belongs in services.

The repository imports and manages 10 recipe objects from recipesData.ts. It provides CRUD methods to retrieve, create, update, and delete recipes.

Where and How It Is Used:

recipelist.tsx uses recipeRepository.getAll() to retrieve and display recipes.
recipelist.tsx uses recipeRepository.delete() to remove recipes.
RecipeForm.tsx uses recipeRepository.create() to save new recipes and getAll() to refresh the displayed list.

This keeps recipe data access separate from the components. The repository was created as part of I.1 and I.2 and integrated into the Recipes components during I.3.

## 5. Separation of Logic

The FoodieHub application separates different types of logic to keep the code organized and easier to maintain.

### Presentation Logic

Presentation logic handles user interactions and form input values.

The `useFormFields` hook manages input values and resets fields after submission.

### Business Logic

Business logic contains the rules and operations of the application.

This logic belongs in services rather than directly inside React components or repositories.

### Data Access Logic

Data access logic handles retrieving, creating, updating, and deleting recipe information.

The `recipeRepository` manages these operations using the test data stored in `recipesData.ts`.

Separating these responsibilities makes the application easier to understand, test, and maintain.

## 6. Where and How the Architecture Is Used

### RecipeForm.tsx

The Recipe Form uses the `useFormFields` custom hook to manage recipe name and description inputs.

It uses `recipeService.isValidRecipe()` to validate the input and `recipeService.prepareRecipe()` to prepare the recipe object.

After validation, `recipeRepository.create()` saves the new recipe, and `recipeRepository.getAll()` retrieves the updated recipe list.

The custom hook resets the form fields after a recipe is added.

### recipelist.tsx

The Recipe List uses `recipeRepository.getAll()` to retrieve and display recipes from the test data.

When a user clicks the Remove Recipe button, `recipeRepository.delete()` removes the selected recipe, and `getAll()` retrieves the updated list.

### Architecture Benefits

This implementation separates responsibilities:

* **Custom Hook:** Manages form input values and resets.
* **Service:** Handles recipe validation and preparation.
* **Repository:** Manages recipe data and CRUD operations.
* **Components:** Display recipes and handle user interactions.

This separation makes the Recipes feature easier to understand, maintain, and reuse.
