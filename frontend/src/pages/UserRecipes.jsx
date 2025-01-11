import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Grid2 as Grid, Box, Button } from '@mui/material';
import HomePageRecipe from '../components/HomePageRecipe';
import { fetchGet, fetchDelete } from '../utils/api';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useUser, useUpdateUser } from '../UserContext.jsx'


export default function UserRecipes(props) {

  const [recipes, setRecipes] = useState([])
  const location = useLocation()
  const { isLoggedIn, user } = useUser()

  async function getRecipes() {
    const response = await fetchGet('/api/recipe/')
    if (location.pathname.includes('admin')) {
      setRecipes(response)
    }
    else {
      const userRecipes = response.filter(recipe => recipe.userId == user.id)
      setRecipes(userRecipes)
    }
  }

  useEffect(() => {

    getRecipes()
  }, [])

  const handleDelete = async (recipeId) => {

    const deleteResponse = await fetchDelete(`/api/recipe/${recipeId}`)
    if (deleteResponse.ok) {
      const updatedRecipes = recipes.filter(recipe => recipe.id != recipeId)
      setRecipes(updatedRecipes)
    }
  }

  const recipeElements = recipes.map(recipe => {
    return (
      <>
        <Box >
          <NavLink to={recipe.id} className="navlink">

            <HomePageRecipe
              key={recipe.id}
              id={recipe.id}
              img={recipe.img}
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
          <Button startIcon={<DeleteRoundedIcon />} onClick={() => handleDelete(recipe.id)} />
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
