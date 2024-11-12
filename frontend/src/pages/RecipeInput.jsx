import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { TextField, Button, MenuItem, Typography, Box, IconButton, Checkbox, FormControl, FormControlLabel, InputAdornment, Select } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import { getRecipe } from '../api';

const DragDropContainer = styled('div')({
  border: '2px dashed #ccc',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  color: '#999',
});

export function loader({ params }) {
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

export default function RecipeInput() {

  const data = useLoaderData()
  const recipe = data.recipes

  const [title, setTitle] = React.useState(recipe.title);
  const [description, setDescription] = React.useState(recipe.description);
  const [photo, setPhoto] = React.useState(recipe.photo);
  const [ingredients, setIngredients] = React.useState(recipe.ingredients);
  const [difficulty, setDifficulty] = React.useState(recipe.difficulty);
  const [prepTime, setPrepTime] = React.useState(recipe.prepTime);
  const [cookTime, setCookTime] = React.useState(recipe.cookTime);
  const [servings, setServings] = React.useState(recipe.servings);
  const [visibility, setVisibility] = React.useState(recipe.visibility);
  const [tags, setTags] = React.useState('');

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

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
    <Box component="form" sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>
      <Typography variant="h5" mb={2}>Add New Recipe</Typography>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
      />

      <TextField
        fullWidth
        label="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        variant="outlined"
        margin="normal"
      />

      <Typography variant="subtitle1" mt={2}>Upload Dish Photo</Typography>
      <DragDropContainer>
        <input
          type="file"
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
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
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
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
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
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        type="number"
        variant="outlined"
        margin="normal"
        InputProps={{
          endAdornment: <InputAdornment position="end">min</InputAdornment>,
        }}
      />

      <TextField
        fullWidth
        label="Cook Time (minutes)"
        value={cookTime}
        onChange={(e) => setCookTime(e.target.value)}
        type="number"
        variant="outlined"
        margin="normal"
        InputProps={{
          endAdornment: <InputAdornment position="end">min</InputAdornment>,
        }}
      />

      <TextField
        fullWidth
        label="Servings"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
        type="number"
        variant="outlined"
        margin="normal"
      />

      <FormControl component="fieldset" margin="normal">
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility === 'public'}
              onChange={() => setVisibility(visibility === 'public' ? 'private' : 'public')}
            />
          }
          label="Public"
        />
      </FormControl>

      <TextField
        fullWidth
        label="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        helperText="Separate tags with commas"
        variant="outlined"
        margin="normal"
      />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Submit Recipe
      </Button>
    </Box>
  );
};

