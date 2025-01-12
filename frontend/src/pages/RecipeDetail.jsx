import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Box, CardMedia, Typography, CircularProgress } from '@mui/material/';
import RecipeSummaryBox from '../components/RecipeSummaryBox';
import IngredientsList from '../components/IngredientsList';
import RecipeStepsList from '../components/RecipeStepsList';
import { fetchGet } from '../utils/api.js'
import userDefaultAvatar from '../images/default-user-avatar.png'

export default function RecipeDetail(props) {

  const testData = {
    userId: "asd3asdas",
    id: 1,
    name: "Bran Muffins",
    author: {
      id: 1,
      name: "admin",
      avatar: userDefaultAvatar
    },
    createDate: '3.11.2024',
    time: "30",
    isPublic: true,
    cookTime: "1 hour",
    servings: "4",
    difficulty: "Easy",
    recipeIngredients: [{ id: 1, content: "1 cup (60g) wheat bran" }, { id: 1, content: "1 1/2 cups (180g) white whole wheat flour" }],
    description: "A malty, nutty, and sweet breakfast muffin with an easy trick for a moist and flavorful crumb.",
    recipeSteps: [
      { id: 1, content: "Preheat the oven to 350 Farenheit degrees" },
      { id: 2, content: "Toast the wheat bran" },
      { id: 3, content: "Prepare the muffin pan" },
      { id: 4, content: "Combine the dry ingredients and wet ingredients" },
      { id: 5, content: "Combine the wet and dry ingredients" },
      { id: 6, content: "Bake" },
      { id: 7, content: "Cool muffins and serve" }
    ],
    upload: { url: "https://www.simplyrecipe.com/thmb/cvOjc9W1eNwGQFN0V3aCrdpkXZs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simplyrecipe_BranMuffins_LEAD_7-fd45c486d07348438b564e34f6013713.jpg" },
    RecipeLikes: { 1: 2, 2: 6, 3: 4, 4: 20, 5: 60 },
    tags: ['Breakfast', 'vegetarian', 'muffins']
  }

  const [recipe, setRecipe] = useState(testData)
  const params = useParams()

  useEffect(() => {
    async function getRecipe() {
      const data = await fetchGet(`/api/recipe/${params.id}`)
      console.log(data)
      setRecipe(data)
    }
    getRecipe()
  }, [])

  return (
    <Container sx={{ mt: 4 }}>
      {
        <>
          <Typography gutterBottom variant="h2" component="div" sx={{ fontWeight: 'bold' }}>
            {recipe.name}
          </Typography>
          <Typography gutterBottom variant="body1" component="div" sx={{ mb: 4 }}>
            {recipe.description}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, overflow: 'auto', mb: 4 }}>
            <CardMedia
              component="img"
              alt={recipe.name}
              image={recipe.upload.url}
              sx={{
                aspectRatio: '16 / 9',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
            <RecipeSummaryBox
              difficulty={recipe.difficulty}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
              servings={recipe.servings}
              scoreVotes={recipe.RecipeLikes}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, overflow: 'auto' }}>
            <IngredientsList ingredients={recipe.recipeIngredients} />
            <RecipeStepsList directions={recipe.recipeSteps} />
          </Box>
        </>
      }
    </Container>
  );

}
