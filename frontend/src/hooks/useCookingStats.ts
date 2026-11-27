import { useState } from "react";
import { cookingStatsService } from "../services/cookingStatsService";

/**
 * Custom hook for shared cooking statistics.
 *
 * Returns:
 * recipesCooked - the current number of recipes cooked.
 * addRecipeCooked - increases the recipes cooked count by one.
 */
export function useCookingStats() {
  const [recipesCooked, setRecipesCooked] = useState(() =>
    cookingStatsService.getRecipesCooked()
  );

  const addRecipeCooked = () => {
    const updatedCount = cookingStatsService.incrementRecipesCooked();
    setRecipesCooked(updatedCount);
  };

  return {
    recipesCooked,
    addRecipeCooked,
  };
}