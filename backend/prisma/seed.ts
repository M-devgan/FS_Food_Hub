import { prisma } from "../src/prismaClient.js";

const ingredients = [
  {
    name: "Pasta",
    characteristics: "Soft when cooked and made from wheat",
  },
  {
    name: "Cheese",
    characteristics: "Dairy product, creamy and melty",
  },
  {
    name: "Garlic",
    characteristics: "Aromatic ingredient with a strong flavour",
  },
  {
    name: "Butter",
    characteristics: "Creamy dairy product used for cooking",
  },
  {
    name: "Cream",
    characteristics: "Rich dairy product with a smooth texture",
  },
  {
    name: "Chicken",
    characteristics: "Protein that is tender when cooked",
  },
  {
    name: "Tortillas",
    characteristics: "Soft flatbread used to hold taco fillings",
  },
  {
    name: "Lettuce",
    characteristics: "Fresh, green and crunchy vegetable",
  },
  {
    name: "Tomatoes",
    characteristics: "Fresh, juicy and slightly sweet",
  },
  {
    name: "Flour",
    characteristics: "Dry ingredient that provides structure",
  },
  {
    name: "Cocoa Powder",
    characteristics: "Dry ingredient with a rich chocolate flavour",
  },
  {
    name: "Sugar",
    characteristics: "Sweetener used in baking",
  },
  {
    name: "Eggs",
    characteristics: "Helps bind ingredients together",
  },
  {
    name: "Milk",
    characteristics: "Liquid dairy product that adds moisture",
  },
];

async function main() {
  for (const ingredient of ingredients) {
    const existing = await prisma.ingredient.findFirst({
      where: { name: ingredient.name },
    });

    if (!existing) {
      await prisma.ingredient.create({
        data: ingredient,
      });

      console.log(`Created: ${ingredient.name}`);
    } else {
      console.log(`Already exists: ${ingredient.name}`);
    }
  }

  console.log("Ingredients seeding completed!");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });