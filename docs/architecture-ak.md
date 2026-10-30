
# FoodieHub — Ingredients Architecture Documentation

**Contributor:** Amrinder Kaur  
**Sprint:** 3  
**Feature:** Ingredients

## 1. Ingredient Repository

**File:** `src/repositories/ingredientRepository.ts`

### What does it do?

The Ingredient Repository manages ingredient data using five CRUD methods:

- `getAll()` — Returns all ingredients.
- `getById(id)` — Finds an ingredient by its ID.
- `create(ingredient)` — Adds a new ingredient.
- `update(id, updatedIngredient)` — Updates an existing ingredient.
- `remove(id)` — Removes an ingredient.

The repository uses the 14 initial mock ingredients from `src/data/ingredientsData.ts`.

### Why does this logic belong in the repository?

The repository is responsible for data access and data operations. Keeping this logic separate from React components improves separation of concerns.

The components focus on displaying the user interface, while the repository manages ingredient data. This makes the code easier to maintain and test.

### Where and how is it used?

The repository is used in two Ingredients components:

- `src/components/ingredients/ingredients.tsx` calls `getAll()` to display ingredients and `remove()` to delete an ingredient.
- `src/components/ingredients/IngredientForm.tsx` calls `create()` to add a new ingredient and `getAll()` to refresh the list.

The `Ingredient` type in `src/types/Ingredient.ts` ensures the data follows a consistent structure.

## 2. Ingredient Service

**File:** `src/services/ingredientService.ts`

### What does it do?

The Ingredient Service handles ingredient business logic using three methods:

- `isValidIngredient()` — Checks that the ingredient name and characteristics are not empty.
- `prepareIngredient()` — Trims input values and prepares a new Ingredient object.
- `canRemoveIngredient()` — Checks whether an ingredient ID is a positive integer before removal.

### Why does this logic belong in the service?

The service handles business rules separately from React components and the repository.

- The service handles ingredient validation and preparation.
- The repository manages ingredient data.
- React components handle the user interface.
- The custom hook manages form input state.

This separation makes the code easier to maintain and reuse.

### Where and how is it used?

The Ingredient Service is used in two components:

- `src/components/ingredients/IngredientForm.tsx` uses `isValidIngredient()` to validate form input and `prepareIngredient()` to create a new Ingredient object.
- `src/components/ingredients/ingredients.tsx` uses `canRemoveIngredient()` to validate an ingredient ID before removing it through the repository.

## 3. Custom Hook

**File:** `src/hooks/useFormFields.ts`

**Implemented by:** Komal  
**Integrated into:** `src/components/ingredients/IngredientForm.tsx`

### What does it do?

The `useFormFields` custom hook manages form input values using React state.

It returns three values:

- `value` — Stores the current input value.
- `setValue` — Updates the input value.
- `resetValue` — Resets the input after form submission.

### Why does this logic belong in a hook?

The hook handles reusable presentation logic rather than business logic or data access.

It keeps form state management separate from ingredient validation and repository operations.

### Where and how is it used?

In `IngredientForm.tsx`, the hook manages two fields:

- Ingredient name
- Ingredient characteristics

When the user submits the form, the Ingredient Service validates and prepares the data. The Ingredient Repository stores the new ingredient, and the hook resets the form fields.

## 4. Architecture Summary

The Ingredients feature separates responsibilities into different layers:

- **Data:** `ingredientsData.ts` provides the initial mock ingredients.
- **Type:** `Ingredient.ts` defines the ingredient structure.
- **Repository:** `ingredientRepository.ts` handles data operations.
- **Service:** `ingredientService.ts` handles business rules and validation.
- **Hook:** `useFormFields.ts` manages form input state.
- **Components:** `ingredients.tsx` and `IngredientForm.tsx` handle the user interface.

This architecture improves organization, maintainability, reusability, and separation of concerns.
