import React, { useState } from 'react';
import { useLoaderData, useActionData, Form } from 'react-router-dom';
import { TextField, Button, MenuItem, Typography, Box, IconButton, Checkbox, FormControl, FormControlLabel, InputAdornment, Select } from '@mui/material';
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


  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>

      <Form method="post">

        <Typography variant="h5" mb={2}>Add New Recipe</Typography>

        <TextField
          fullWidth
          label="Title"
          name="title"
          id="title"
          defaultValue={recipe.title}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Recipe Description"
          name="description"
          defaultValue={recipe.description}
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
        />

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

        <Typography variant="subtitle1" mt={2}>Ingredients</Typography>
        {ingredients.map((ingredient, index) => (
          <Box key={index} display="flex" alignItems="center" mt={1}>
            <TextField
              fullWidth
              name="ingredient"
              defaultValue={ingredient}
              label={`Ingredient ${index + 1}`}
              variant="outlined"
            />
            <IconButton onClick={() => handleRemoveIngredient(index)} color="error">
              <Delete />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<Add />} onClick={handleAddIngredient} sx={{ mt: 1 }}>
          Add Ingredient
        </Button>

        <TextField
          fullWidth
          select
          label="Difficulty"
          name="difficulty"
          defaultValue={recipe.difficulty}
          variant="outlined"
          margin="normal"
        >
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Prep Time (minutes)"
          name="prepTime"
          defaultValue={recipe.prepTime}
          type="number"
          variant="outlined"
          margin="normal"
        //InputProps={{
        //  endAdornment: <InputAdornment position="end">min</InputAdornment>,
        //}}
        />

        <TextField
          fullWidth
          label="Cook Time (minutes)"
          name="cookTime"
          defaultValue={recipe.cookTime}
          type="number"
          variant="outlined"
          margin="normal"
        //InputProps={{
        //  endAdornment: <InputAdornment position="end">min</InputAdornment>,
        //}}
        />

        <TextField
          fullWidth
          label="Servings"
          name="servings"
          defaultValue={recipe.servings}
          type="number"
          variant="outlined"
          margin="normal"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={recipe.visibility === 'public'}
            />
          }
          label="Public"
        />


        <TextField
          fullWidth
          label="Tags"
          defaultValue={recipe.tags}
          helperText="Separate tags with commas"
          variant="outlined"
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Submit Recipe
        </Button>

      </Form>

    </Box>
  );
};

