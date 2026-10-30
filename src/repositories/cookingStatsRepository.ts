import type { CookingStats } from "../types/CookingStats";
import { cookingStatsData } from "../data/cookingStatsData";

let cookingStats: CookingStats = { ...cookingStatsData };

export const cookingStatsRepository = {
  get(): CookingStats {
    return { ...cookingStats };
  },

  updateRecipesCooked(value: number): CookingStats {
    cookingStats = {
      ...cookingStats,
      recipesCooked: value,
    };

    return { ...cookingStats };
  },
};