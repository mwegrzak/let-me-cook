import * as React from 'react';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom'
import HomePageRecipe from '../components/HomePageRecipe';

export default function RecipeDetail(props) {


  const [recipe, setRecipe] = React.useState(null);
  const params = useParams()
  console.log(params)

  React.useEffect(() => {
    fetch(`/api/recipe/${params.id}`)
      .then(res => res.json())
      .then(data => setRecipe(data.recipes))
  }, [params.id])

  console.log(recipe)



  return (
    <Container>

      {recipe ? (

        <HomePageRecipe
          id={recipe.id}
          img={recipe.imgUrl}
          tags={recipe.tags}
          title={recipe.title}
          description={recipe.description}
          author={recipe.author}
        />
      ) : <h1>Loading...</h1>

      }





    </Container>
  );

}
