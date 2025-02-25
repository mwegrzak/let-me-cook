import React, { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Chip, Grid2 as Grid, Box, Skeleton } from '@mui/material';
import HomePageRecipe from '../components/HomePageRecipe';
import { fetchGet } from '../utils/api';

export default function Home(props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getRecipes() {
      setLoading(true)
      const response = await fetchGet('/api/recipe/')
      setRecipes(response)
      setLoading(false)
    }
    getRecipes()
  }, [])

  const recipeFilter = searchParams.get("type")
  const filteredRecipes = recipeFilter ? recipes.filter(recipe => recipe.tags.indexOf(recipeFilter) > -1) : recipes


  function handleFilterChange(key, value) {
    if (key === null) { setSearchParams([]); }
    else { setSearchParams(prevParams => ([[key, value]])); }
  }

  const recipeElements = filteredRecipes.map(item => {
    return (
      <NavLink to={`recipe/${item.id}`} className="navlink">
        <HomePageRecipe
          key={item.id}
          id={item.id}
          title={item.name}
          description={item.description}
          author={item.userId}
          // TODO
          img={item.img ? item.img : "https://cdn.aniagotuje.com/pictures/articles/2024/11/70950775-v-1080x1080.jpg"}
          //score={item.score}
          //tags={item.tags}
          score={{ 1: 1, 2: 2, 3: 6, 4: 20, 5: 100 }}
          tags={['dinner']}
        />
      </NavLink>
    )
  })

  return (
    <>
      {
        loading ? (
          <Grid container spacing={2} columns={20}>
            <Skeleton variant="rectangular" width="20em" height="22em" sx={{ mr: "4%" }} />
            <Skeleton variant="rectangular" width="20em" height="22em" sx={{ mr: "4%" }} />
            <Skeleton variant="rectangular" width="20em" height="22em" sx={{ mr: "4%" }} />
          </Grid>

        ) : (
          <>
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                gap: 3,
                overflow: 'auto',
              }}
            >
              <Chip onClick={() => handleFilterChange(null, null)} size="medium" label="All categories" />
              <Chip onClick={() => handleFilterChange("type", "Breakfast")} size="medium" label="Breakfast" color='primary' sx={{ backgroundColor: 'none' }} />
              <Chip onClick={() => handleFilterChange("type", "Dinner")} size="medium" label="Dinner" sx={{ backgroundColor: 'transparent', border: 'none', }} />
              <Chip onClick={() => handleFilterChange("type", "Dessert")} size="medium" label="Dessert" sx={{ backgroundColor: 'transparent', border: 'none', }} />
              <Chip onClick={() => handleFilterChange("type", "Aperitif")} size="medium" label="Aperitif" sx={{ backgroundColor: 'transparent', border: 'none', }} />
            </Box>
            <Grid container spacing={2} columns={20}>
              {recipeElements}
            </Grid>
          </>
        )
      }
    </>

  );
}
