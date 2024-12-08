import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Box, CardMedia, Typography, CircularProgress } from '@mui/material/';
import RecipeSummaryBox from '../components/RecipeSummaryBox';
import IngredientsList from '../components/IngredientsList';
import RecipeStepsList from '../components/RecipeStepsList';
import { fetchGet } from '../utils/api.js'

export default function RecipeDetail(props) {

  const [recipe, setRecipe] = useState([])
  const params = useParams()

  useEffect(() => {
    async function getRecipes() {
      const data = await fetchGet(`/api/recipe/${params.id}`)
      console.log(data)
      setRecipe(data)
    }
    getRecipes()
  }, [])

  return (
    <Container>
      {
        <>
          <Typography gutterBottom variant="h1" component="div">
            {recipe.title}
          </Typography>
          <Typography gutterBottom variant="body" component="div">
            {recipe.description}

          </Typography>
          <Box sx={{ display: 'inline-flex', flexDirection: 'row', gap: 3, overflow: 'auto' }}>

            <CardMedia
              component="img"
              alt={recipe.title}
              image={recipe.imgUrl}
              sx={{
                aspectRatio: '16 / 9',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <RecipeSummaryBox
              difficulty={recipe.difficulty}
              scoreVotes={recipe.score}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
              servings={recipe.servings} />
          </Box>
          <Box sx={{ display: 'inline-flex', flexDirection: 'row', gap: 3, overflow: 'auto' }}>
            <IngredientsList ingredients={recipe.ingredients} />
            <RecipeStepsList stepsList={recipe.directions} />
          </Box>
        </>
      }

    </Container>
  );

}
