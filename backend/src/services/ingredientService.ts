import { prisma } from "../prismaClient.js";

// Get all ingredients
export const getAllIngredients = async () => {
  return prisma.ingredient.findMany({
    orderBy: { id: "asc" },
  });
};

// Get ingredient by ID
export const getIngredientById = async (id: number) => {
  return prisma.ingredient.findUnique({
    where: { id },
  });
};

// Create ingredient
export const createIngredient = async (
  name: string,
  characteristics: string
) => {
  return prisma.ingredient.create({
    data: { name, characteristics },
  });
};

// Update ingredient
export const updateIngredient = async (
  id: number,
  name: string,
  characteristics: string
) => {
  return prisma.ingredient.update({
    where: { id },
    data: { name, characteristics },
  });
};

// Delete ingredient
export const deleteIngredient = async (id: number) => {
  return prisma.ingredient.delete({
    where: { id },
  });
};