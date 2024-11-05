import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import HomePageRecipe from '../components/HomePageRecipe';

export default function Home(props) {

  const [recipes, setRecipes] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    fetch("/api/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data.recipes))
  }, [])

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
      <Grid container spacing={2} columns={20}>
        {recipeElements}
      </Grid>

    </>

  );
}
