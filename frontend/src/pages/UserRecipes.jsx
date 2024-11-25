import React from 'react';
import { useLoaderData, NavLink } from 'react-router-dom';
import { Grid2 as Grid, Box, Button } from '@mui/material';
import HomePageRecipe from '../components/HomePageRecipe';
import { getRecipes, deleteRecipe } from '../utils/api';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export function loader() {

  return getRecipes()
  //return getRecipes(userId)
}

export default function UserRecipes(props) {
  const { recipes } = useLoaderData()

  const recipeElements = recipes.map(item => {
    return (
      <>
        <Box >

          <NavLink to={`/recipes/edit/${item.id}`} className="navlink">
            <Button startIcon={<EditRoundedIcon />} />
          </NavLink>
          <Button startIcon={<DeleteRoundedIcon />} onClick={deleteRecipe(item.id)} />
        </Box>


        <HomePageRecipe
          key={item.id}
          id={item.id}
          img={item.imgUrl}
          tags={item.tags}
          title={item.title}
          description={item.description}
          author={item.author}
          score={item.score}
        />
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
