import { prisma } from "../prismaClient.js";

// GET all reviews
export const getAllReviews = async () => {
  return await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

// CREATE a new review
export const addReview = async (data: {
  recipeName: string;
  reviewer: string;
  rating: number;
  comment: string;
}) => {
  return await prisma.review.create({
    data: {
      recipeName: data.recipeName,
      reviewer: data.reviewer,
      rating: data.rating,
      comment: data.comment,
    },
  });
};

// DELETE a review
export const removeReview = async (id: number) => {
  return await prisma.review.delete({
    where: {
      id: id,
    },
  });
};