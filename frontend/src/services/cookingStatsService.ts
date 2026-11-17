import { cookingStatsRepository } from "../repositories/cookingStatsRepository";

export const cookingStatsService = {
  getRecipesCooked(): number {
    return cookingStatsRepository.get().recipesCooked;
  },

  incrementRecipesCooked(): number {
    const current = cookingStatsRepository.get().recipesCooked;

    return cookingStatsRepository.updateRecipesCooked(current + 1)
      .recipesCooked;
  },
};