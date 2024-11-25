import React, { useState } from 'react';
import { useLoaderData, useActionData, Form } from 'react-router-dom';
import { TextField, Button, MenuItem, Typography, Box, Checkbox, FormControlLabel, Card, CardContent } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import { getRecipe, requireAuth } from '../utils/api';

const DragDropContainer = styled('div')({
  border: '2px dashed #ccc',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  color: '#999',
});

export async function loader({ params }) {
  await requireAuth()

  if (params.id) {
    const recipe = getRecipe(params.id)
    return recipe
  }
  else {
    const recipe = {
      recipes: {
        title: '',
        description: '',
        photo: null,
        ingredients: [''],
        directions: [''],
        difficulty: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        visibility: 'private',
        tags: ''
      }
    }
    return recipe
  }

}

export async function action({ request }) {
  //TODO
  // get url whether its add or edit
  // const endpoint = request.url
  // const id = request.params.id
  const endpoint = 'add'
  const id = '1'

  const formData = await request.formData()
  const values = [...formData.entries()];
  console.log(formData);
  console.log(values);
  return null

  /*
  try {
    const user = await fetchPost(`/${endpoint}/${id}`, { password: password, email: email })
    redirect('/')

  } catch (err) {
    return err
  }
  return response
  */
}
export default function RecipeInput() {

  const data = useLoaderData()
  const recipe = data.recipes
  const [photo, setPhoto] = useState(recipe.photo);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [directions, setDirections] = useState(recipe.directions);


  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = () => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients
      newIngredients.pop()
      setIngredients([...newIngredients]);
    }
  };


  const handleAddDirection = () => {
    setDirections([...directions, '']);
  };

  const handleRemoveDirection = () => {
    if (directions.length > 1) {
      const newDirections = directions
      newDirections.pop()
      setDirections([...newDirections]);
    }
  };


  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4 }}>

      <Form method="post">

        <Typography variant="h5" mb={2}>Add New Recipe</Typography>
        <TextField fullWidth label="Title" name="title" id="title" defaultValue={recipe.title} variant="outlined" margin="normal" />
        <TextField fullWidth label="Recipe Description" name="description" defaultValue={recipe.description} variant="outlined" margin="normal" />

        <Box display={'flex'} justifyContent={'space-evenly'}>
          <Box>
            <Typography variant="subtitle1" mt={2}>Upload Dish Photo</Typography>
            <DragDropContainer>
              <input
                type="file"
                name="photo"
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                onClick={handlePhotoUpload}
              />
              <label htmlFor="photo-upload">
                {photo ? <Typography>{photo.name}</Typography> : <Typography>Click to upload :3</Typography>}
              </label>
            </DragDropContainer>
          </Box>


          <Card>
            <CardContent>
              <Box display={'flex'}>
                <TextField fullWidth select label="Difficulty" name="difficulty" defaultValue={recipe.difficulty} variant="outlined" margin="normal">
                  {['Easy', 'Medium', 'Hard'].map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField fullWidth label="Servings" name="servings" defaultValue={recipe.servings} type="number" variant="outlined" margin="normal" />
              </Box>
              <Box display={'flex'}>

                <TextField fullWidth label="Prep Time (minutes)" name="prepTime" defaultValue={recipe.prepTime} type="number" variant="outlined" margin="normal" />
                <TextField fullWidth label="Cook Time (minutes)" name="cookTime" defaultValue={recipe.cookTime} type="number" variant="outlined" margin="normal" />
              </Box>

              <FormControlLabel
                control={
                  <Checkbox checked={recipe.visibility === 'public'} />
                }
                label="Public"
              />
            </CardContent>

          </Card>
        </Box>

        <Box display={'flex'} justifyContent={'center'} >

          <Box alignItems="center" maxWidth={'25em'} mt={1}>
            <Typography variant="subtitle1" mt={2}>Ingredients</Typography>
            {ingredients.map((ingredient, index) => (
              <TextField
                fullWidth
                key={index}
                name="ingredient"
                defaultValue={ingredient}
                label={`Ingredient ${index + 1}`}
                variant="outlined"
              />
            ))}

            <Button startIcon={<Add />} onClick={handleAddIngredient} sx={{ mt: 1 }}>
              Add Ingredient
            </Button>
            <Button startIcon={<Delete />} onClick={handleRemoveIngredient} >
              Delete Ingredient
            </Button>
          </Box>

          <Box display="block" alignItems="center" maxWidth={'40em'} mt={1}>
            <Typography variant="subtitle1" mt={2}>Directions</Typography>
            {directions.map((direction, index) => (
              <Box key={index} margin={'10px'}>
                <TextField fullWidth name="step" defaultValue={direction.step} label={`Step ${index + 1}`} variant="outlined" />
                <TextField name="description"
                  defaultValue={direction.description}
                  label={'Description'}
                  variant="outlined"
                  rows={4}
                  multiline
                  sx={{
                    width: { sm: 600, md: 600 },
                    "& .MuiInputBase-root": { height: 100 }
                  }}
                />
              </Box>
            ))}

            <Button startIcon={<Add />} onClick={handleAddDirection} sx={{ mt: 1 }}>
              Add direction
            </Button>
            <Button startIcon={<Delete />} onClick={handleRemoveDirection} >
              Delete direction
            </Button>
          </Box>
        </Box>

        <TextField fullWidth label="Tags" defaultValue={recipe.tags} helperText="Separate tags with commas" variant="outlined" margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Submit Recipe
        </Button>

      </Form>

    </Box>
  );
};

