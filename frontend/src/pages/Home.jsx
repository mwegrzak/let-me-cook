import React from 'react';
import { useSearchParams, useLoaderData } from 'react-router-dom';
import { Chip, Grid2, Box } from '@mui/material';
import HomePageRecipe from '../components/HomePageRecipe';
import { fetchGet } from '../utils/api';

export function loader() {
  return fetchGet('/api/recipe')
}

export default function Home(props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const recipes = useLoaderData()
  console.log(recipes)
  const recipeFilter = searchParams.get("type")
  const filteredRecipes = recipeFilter ? recipes.filter(recipe => recipe.tags.indexOf(recipeFilter) > -1) : recipes


  function handleFilterChange(key, value) {
    if (key === null) { setSearchParams([]); }
    else { setSearchParams(prevParams => ([[key, value]])); }
  }

  const recipeElements = filteredRecipes.map(item => {
    return <HomePageRecipe
      key={item.id}
      id={item.id}
      img={item.imgUrl}
      tags={item.tags}
      title={item.title}
      description={item.description}
      author={item.author}
      score={item.score}
    />
  })

  return (
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
      <Grid2 container spacing={2} columns={20}>
        {recipeElements}
      </Grid2>

    </>

  );
}
