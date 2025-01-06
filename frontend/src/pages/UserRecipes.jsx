import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid2 as Grid, Box, Button } from '@mui/material';
import HomePageRecipe from '../components/HomePageRecipe';
import { fetchGet, fetchDelete } from '../utils/api';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function UserRecipes(props) {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    // useUser + body
    // todo - if admin page fetch all recipes
    // useLocation.pathname
    async function getRecipes() {
      const response = await fetchGet('/api/recipe/')
      setRecipes(response)
    }
    getRecipes()
  }, [])

  const recipeElements = recipes.map(recipe => {
    return (
      <>
        <Box >
          <NavLink to={recipe.id} className="navlink">

            <HomePageRecipe
              key={recipe.id}
              id={recipe.id}
              img={recipe.photo}
              tags={recipe.tags}
              title={recipe.title}
              description={recipe.description}
              author={recipe.userId}
              score={recipe.score}
            />
          </NavLink>
          <NavLink to={`edit/${recipe.id}`} className="navlink">
            <Button startIcon={<EditRoundedIcon />} />
          </NavLink>
          <Button startIcon={<DeleteRoundedIcon />} onClick={() => fetchDelete(`/api/recipe/${recipe.id}`)} />
        </Box>
      </>
    )
  })

  return (
    <>
      <Grid container spacing={2} columns={20}>
        {recipeElements}
      </Grid>

    </>

  );
}
