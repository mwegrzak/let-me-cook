import * as React from 'react';
import Container from '@mui/material/Container';
import FilterBar from '../components/FilterBar';
import FrontPageRecipe from '../components/FrontPageRecipe';
import cardDataJson from '../sample-data/cardData.json';
import Grid from '@mui/material/Grid2';

export default function Home(props) {

  const cardData = cardDataJson['cardData']

  const recipeElements = cardData.map(item => {
    return <FrontPageRecipe
      img={item.img}
      tag={item.tag}
      title={item.title}
      description={item.description}
      authors={item.authors}
    />
  })

  return (
    <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
      <FilterBar />
      <Grid container spacing={2} columns={20}>
        {recipeElements}
      </Grid>
    </Container>


  );
}
