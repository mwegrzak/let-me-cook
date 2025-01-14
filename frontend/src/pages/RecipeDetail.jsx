import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Box, CardMedia, Typography } from '@mui/material/';
import RecipeSummaryBox from '../components/RecipeSummaryBox';
import IngredientsList from '../components/IngredientsList';
import RecipeStepsList from '../components/RecipeStepsList';
import { fetchGet } from '../utils/api.js'

export default function RecipeDetail(props) {

  const testData = {
    id: 1,
    name: "",
    time: "",
    cookTime: "",
    servings: "",
    difficulty: "Easy",
    recipeIngredients: [],
    description: "",
    recipeSteps: [
    ],
  }

  const [recipe, setRecipe] = useState(testData)
  const params = useParams()

  useEffect(() => {
    async function getRecipe() {
      const data = await fetchGet(`/api/recipe/${params.id}`)
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
              image={recipe.img}
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
