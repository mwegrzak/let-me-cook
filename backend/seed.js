import { PrismaClient } from '@prisma/client';
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'User One',
      password: await argon2.hash('password1'),
      isAdmin: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'User Two',
      password: await argon2.hash('password2'),
    },
  });

  // Create Uploads
  const upload1 = await prisma.upload.create({
    data: {
      type: 1,
      userId: user1.id,
    },
  });

  const upload2 = await prisma.upload.create({
    data: {
      type: 0,
      userId: user2.id,
    },
  });

  // Create Recipes
  const recipe1 = await prisma.recipe.create({
    data: {
      name: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish.',
      difficulty: 3,
      servings: 4,
      prepTime: 15,
      cookTime: 45,
      userId: user1.id,
      uploadId: upload1.id,
      recipeIngredients: {
        create: [
          { name: 'Spaghetti' },
          { name: 'Ground Beef' },
          { name: 'Tomato Sauce' },
        ],
      },
      recipeSteps: {
        create: [
          { description: 'Cook the spaghetti according to the package instructions.' },
          { description: 'Brown the ground beef in a skillet.' },
          { description: 'Simmer the beef with tomato sauce.' },
        ],
      },
    },
  });

  const recipe2 = await prisma.recipe.create({
    data: {
      name: 'Pancakes',
      description: 'Fluffy and delicious breakfast pancakes.',
      difficulty: 2,
      servings: 2,
      prepTime: 10,
      cookTime: 15,
      userId: user2.id,
      uploadId: upload2.id,
      recipeIngredients: {
        create: [
          { name: 'Flour' },
          { name: 'Eggs' },
          { name: 'Milk' },
        ],
      },
      recipeSteps: {
        create: [
          { description: 'Mix all ingredients into a smooth batter.' },
          { description: 'Heat a skillet and pour batter to form pancakes.' },
          { description: 'Cook until golden brown on both sides.' },
        ],
      },
    },
  });

  // Create Password Resets
  await prisma.passwordReset.create({
    data: {
      token: 'reset-token-1',
      userId: user1.id,
      validTill: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    },
  });

  await prisma.passwordReset.create({
    data: {
      token: 'reset-token-2',
      userId: user2.id,
      validTill: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    },
  });

  console.log('Database has been seeded with sample data.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
