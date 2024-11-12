import * as React from 'react';
import { useSearchParams, useLoaderData } from 'react-router-dom';
import { Typography, Chip, Grid2, CircularProgress, Box } from '@mui/material';
import HomePageRecipe from '../components/HomePageRecipe';
import { getRecipes } from '../api';

export function loader() {
  return getRecipes()
}

export default function Home(props) {

  const [searchParams, setSearchParams] = useSearchParams();
  const { recipes } = useLoaderData()

  const handleFilterClick = () => {
    console.info('You clicked the Chip.');
  };


  const recipeElements = recipes.map(item => {
    return <HomePageRecipe
      key={item.id}
      id={item.id}
      img={item.imgUrl}
      tags={item.tags}
      title={item.title}
      description={item.description}
      author={item.author}
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
        { /*********** FILTER BAR ***********/}
        <Chip onClick={handleFilterClick} size="medium" label="Wszystkie kategorie" />
        <Chip onClick={handleFilterClick} size="medium" label="Śniadania" sx={{ backgroundColor: 'transparent', border: 'none', }} />
        <Chip onClick={handleFilterClick} size="medium" label="Obiady" sx={{ backgroundColor: 'transparent', border: 'none', }} />
        <Chip onClick={handleFilterClick} size="medium" label="Desery" sx={{ backgroundColor: 'transparent', border: 'none', }} />
        <Chip onClick={handleFilterClick} size="medium" label="Przekąski" sx={{ backgroundColor: 'transparent', border: 'none', }} />
      </Box>
      <Grid2 container spacing={2} columns={20}>
        {recipeElements}
      </Grid2>

    </>

  );
}
