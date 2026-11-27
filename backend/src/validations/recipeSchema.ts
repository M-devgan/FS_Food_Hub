import Joi from "joi";

// Schema for creating a recipe
export const recipeSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),

  description: Joi.string().trim().min(1).required(),

  ingredients: Joi.array()
    .items(Joi.number().integer().positive())
    .default([]),
});

// Schema for updating an existing recipe
export const updateRecipeSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),

  description: Joi.string().trim().min(1).required(),
});

// Schema for validating recipe ID parameters
export const recipeIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});