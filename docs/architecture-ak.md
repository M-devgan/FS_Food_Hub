
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

The components focus on displaying the user interface, while the repository manages ingredient data. This also makes the code easier to maintain and test.

### Where and how is it used?

The repository is used in two Ingredients components:

- `src/components/ingredients/ingredients.tsx` calls `getAll()` to display ingredients and `remove()` to delete an ingredient.
- `src/components/ingredients/IngredientForm.tsx` calls `create()` to add a new ingredient and `getAll()` to refresh the list.

The `Ingredient` type in `src/types/Ingredient.ts` ensures the data follows a consistent structure.

## 2. Ingredient Service

**Status:** Planned for Team Issue #51 — Service Definitions.

The service will contain reusable business logic. Its specific responsibilities and usage will be documented after implementation.

## 3. Custom Hook

**Status:** Team Issue #50 — Custom Hook Definitions is in progress.

The team is developing reusable presentation logic. Any hook I contribute to or integrate into the Ingredients feature will be documented here once implemented.

## 4. Architecture Summary

The Ingredients feature separates responsibilities into different layers:

- **Data:** `ingredientsData.ts` provides the initial mock ingredients.
- **Type:** `Ingredient.ts` defines the ingredient structure.
- **Repository:** `ingredientRepository.ts` handles data operations.
- **Components:** `ingredients.tsx` and `IngredientForm.tsx` handle the user interface.

This architecture improves organization, maintainability, and separation of concerns.
