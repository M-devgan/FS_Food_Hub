# Recipes Architecture Documentation

## 1. Overview

This document explains the architecture used for the Recipes feature in the FoodieHub application.

The purpose of this architecture is to keep presentation logic, business logic, and data access logic separate.

The Recipes feature uses a repository to manage recipe data and a custom hook to manage form input values. Service integration is being handled as part of the team's Sprint 3 work.

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

**Purpose:**

The service layer is responsible for handling reusable business logic separately from components and repositories.

**Logic Separation:**

Services contain business rules and operations, while custom hooks handle presentation logic and repositories manage data access.

**Where and How It Is Used:**

The team is working on T.2 – Service Definitions. Service integration for the Recipes feature is still pending, so its specific implementation and usage cannot yet be documented.

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

**Where and How It Is Used:**

The repository imports and manages recipe test data through its CRUD methods. It was created as part of I.1 and I.2 and has been merged into `develop`.

Integration with the Recipes components is part of the I.3 refactoring work.

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

The hook updates input values when the user types and resets both fields after a recipe is added.

### Recipe Repository

The `recipeRepository` provides CRUD operations for recipe data and imports the test data from `recipesData.ts`.

The repository will be connected to the Recipes components during the I.3 refactoring work.

### Service Integration

The service layer will handle business logic separately from presentation and data access logic.

The exact service usage will depend on the team's T.2 implementation.
