import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true
    }
  }
}).$extends({
  result: {
    recipe: {
      img: {
        needs: { uploadId: true },
        compute(recipe) {
          if (recipe.uploadId) {
            return `${process.env.STATIC_CONTENT_URL}${recipe.uploadId}.jpeg`;
          } else {
            return null;
          }
        }
      }
    }
  }
});

export default prisma;