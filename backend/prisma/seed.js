import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      isAdmin: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'securepass456',
    },
  });

  // Create Recipes
  const recipe1 = await prisma.recipe.create({
    data: {
      name: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti, minced meat, tomato sauce, onions, garlic',
      steps: '1. Boil pasta. 2. Prepare sauce. 3. Mix and serve.',
      difficulty: 2,
      time: 30,
      userId: user1.id,
    },
  });

  const recipe2 = await prisma.recipe.create({
    data: {
      name: 'Pancakes',
      description: 'Fluffy and delicious breakfast pancakes.',
      ingredients: 'Flour, eggs, milk, sugar, butter',
      steps: '1. Mix ingredients. 2. Cook on skillet. 3. Serve with syrup.',
      difficulty: 1,
      time: 15,
      userId: user2.id,
    },
  });

  // Create Recipe Likes
  await prisma.recipeLike.create({
    data: {
      recipeId: recipe1.id,
      userId: user2.id,
    },
  });

  await prisma.recipeLike.create({
    data: {
      recipeId: recipe2.id,
      userId: user1.id,
    },
  });

  // Create Sessions
  await prisma.session.create({
    data: {
      id: 'session1',
      sid: 'unique-session-id-1',
      data: JSON.stringify({ isAuthenticated: true }),
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Expires in 24 hours
    },
  });

  await prisma.session.create({
    data: {
      id: 'session2',
      sid: 'unique-session-id-2',
      data: JSON.stringify({ isAuthenticated: false }),
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Expires in 24 hours
    },
  });

  // Create Password Resets
  await prisma.passwordReset.create({
    data: {
      token: 'reset-token-1',
      userId: user1.id,
      validTill: new Date(new Date().getTime() + 1 * 60 * 60 * 1000), // Expires in 1 hour
    },
  });

  await prisma.passwordReset.create({
    data: {
      token: 'reset-token-2',
      userId: user2.id,
      validTill: new Date(new Date().getTime() + 1 * 60 * 60 * 1000), // Expires in 1 hour
    },
  });
}

main()
  .then(() => console.log('Seed data created successfully.'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
