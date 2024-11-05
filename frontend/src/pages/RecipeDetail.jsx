import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { useParams } from 'react-router-dom'

import RecipeSummaryBox from '../components/RecipeSummaryBox';
import IngredientsList from '../components/IngredientsList';
import RecipeStepsList from '../components/RecipeStepsList';

export default function RecipeDetail(props) {


  const [recipe, setRecipe] = React.useState(null);
  const params = useParams()

  React.useEffect(() => {
    fetch(`/api/recipe/${params.id}`)
      .then(res => res.json())
      .then(data => setRecipe(data.recipes))
  }, [params.id])


  return (
    <Container>
      {recipe ? (

        <>
          <Typography gutterBottom variant="h1" component="div">
            {recipe.title}
          </Typography>
          <Typography gutterBottom variant="body" component="div">
            {recipe.description}

          </Typography>
          <Box
            sx={{ display: 'inline-flex', flexDirection: 'row', gap: 3, overflow: 'auto' }}
          >

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
            <RecipeSummaryBox />
          </Box>
          <Box
            sx={{ display: 'inline-flex', flexDirection: 'row', gap: 3, overflow: 'auto' }}
          >

            <IngredientsList ingredientsList={recipe.ingredients} />


            <RecipeStepsList stepsList={recipe.directions} />
          </Box>


        </>
      ) : <h1>Loading...</h1>

      }



    </Container>
  );

}
