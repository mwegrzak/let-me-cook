import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Form, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Typography, Box, Checkbox, Card, CardContent, Input, CardMedia, CardActions } from '@mui/material';
import { Add, CardTravel, Delete } from '@mui/icons-material';
import { fetchGet, fetchPost, fetchPut, API_URL } from '../utils/api';
import { useUser } from '../UserContext';
import placeholderDish from '../images/food-plate.png'

let nextIngredient = 2
let nextStep = 2
export default function RecipeInput() {

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, user } = useUser()
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    uploadId: null,
    ingredients: [{ id: 1, name: '' }],
    steps: [{ id: 1, description: '' }],
    difficulty: '',
    prepTime: '',
    cookTime: '',
    servings: '',
  });

  const difficulty_labels = ['Easy', 'Medium', 'Hard'];


  useEffect(() => {
    async function getRecipe() {
      if (location.pathname.includes('my-recipes/edit')) {
        const response = fetchGet(`/api/recipe/${params.id}`)
        setRecipe(response)
      }
    }
    getRecipe()
  }, [])


  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { id: nextIngredient++, name: '' }]
    });
  };

  const handleRemoveIngredient = (id) => {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter(ingr => ingr.id !== id)
    });
  };

  const handleAddStep = () => {
    setRecipe({
      ...recipe,
      steps: [...recipe.steps, { id: nextStep++, description: '' }]
    });
  };

  const handleRemoveStep = (id) => {
    setRecipe({
      ...recipe,
      steps: recipe.steps.filter(step => step.id !== id)
    });
  };

  const handlePhotoUpload = async (e) => {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]
    setRecipe({ ...recipe, photo: URL.createObjectURL(file) })

    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
    const data = await response.json()
    setRecipe({ ...recipe, uploadId: data.id, photo: URL.createObjectURL(file) })
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRecipe(values => ({ ...values, [name]: value }))
  }

  const handleChangeIngredients = (e, id) => {
    const nextIngredients = recipe.ingredients.map((ing) => {
      if (ing.id === id) {
        ing.name = e.target.value;
      }
      return ing;
    });
    setRecipe({ ...recipe, ingredients: nextIngredients });
  };

  const handleChangeStep = (e, id) => {
    const nextSteps = recipe.steps.map((step) => {
      if (step.id === id) {
        step.description = e.target.value;
      }
      return step;
    });
    setRecipe({ ...recipe, steps: nextSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { photo, ingredients, steps, ...rest } = recipe;
    const payload = {
      ...rest,
      ingredients: ingredients.map(({ name, quantity }) => ({ name, quantity })),
      steps: steps.map(({ description }) => ({ description }))
    };
    const response = location.pathname.includes('edit')
      ? await fetchPut(`/api/recipe/${params.id}`, payload)
      : await fetchPost(`/api/recipe`, payload);
    if (response.ok) {
      navigate('/my-recipes?message=Recipe added');
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4 }}>

      <Form onSubmit={handleSubmit} >

        <Typography variant="h5" mb={2}>Add New Recipe</Typography>
        <TextField onChange={handleChange} fullWidth label="Title" name="name" id="title" value={recipe.name} variant="outlined" margin="normal" />
        <TextField onChange={handleChange} fullWidth label="Recipe Description" name="description" value={recipe.description} variant="outlined" margin="normal" />

        <Box display={'flex'} justifyContent={'space-evenly'}>
          <Box>    servings: {recipe.servings}
          
            <Typography variant="subtitle1" mt={2}>Upload Dish Photo</Typography>

            <Card >
              <CardMedia
                component="img"
                height="250"
                image={recipe.photo}
              />
              <CardContent>

              </CardContent>
              <CardActions>
                <Input
                  type="file"
                  name="photo"
                  accept="image/*"
                  id="photo-upload"
                  onChange={handlePhotoUpload}
                />
              </CardActions>
            </Card>
          </Box>

          <Box>
            <Typography variant="subtitle1" mt={2}>Recipe details</Typography>

            <Card>
              <CardContent>
                <Box display={'flex'}>
                  <TextField onChange={handleChange} fullWidth select label="Difficulty" name="difficulty" value={recipe.difficulty} variant="outlined" margin="normal">
                    {[0,1,2].map((level) => (
                      <MenuItem key={level} value={level}>
                        {difficulty_labels[level]}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField onChange={handleChange} fullWidth label="Servings" name="servings" value={recipe.servings} type="number" variant="outlined" margin="normal" />
                </Box>
                <Box display={'flex'}>

                  <TextField onChange={handleChange} fullWidth label="Prep Time (minutes)" name="prepTime" value={recipe.prepTime} type="number" variant="outlined" margin="normal" />
                  <TextField onChange={handleChange} fullWidth label="Cook Time (minutes)" name="cookTime" value={recipe.cookTime} type="number" variant="outlined" margin="normal" />
                </Box>
              </CardContent>

            </Card>
          </Box>
        </Box>

        <Box display={'flex'} justifyContent={'center'} >

          <Box alignItems="center" maxWidth={'25em'} mt={1}>

            <Typography variant="subtitle1" mt={2}>Ingredients</Typography>
            <Button startIcon={<Add />} onClick={handleAddIngredient} sx={{ mt: 1 }}>
              Add Ingredient
            </Button>

            {recipe.ingredients.map((ingredient) => (
              <Box key={ingredient.id} display="flex" alignItems="center">
                <TextField
                  fullWidth
                  onChange={(e) => handleChangeIngredients(e, ingredient.id)}
                  id={`${ingredient.id}`}
                  name="ingredient"
                  value={ingredient.name}
                  label={`Ingredient ${ingredient.id}`}
                  variant="outlined"
                />
                <Button startIcon={<Delete />} onClick={() => handleRemoveIngredient(ingredient.id)}>
                  Delete
                </Button>
              </Box>
            ))}

          </Box>

          <Box display="block" alignItems="center" maxWidth={'40em'} mt={1}>
            <Typography variant="subtitle1" mt={2}>Steps</Typography>
            <Button startIcon={<Add />} onClick={handleAddStep} sx={{ mt: 1 }}>
              Add Step
            </Button>
            <Box margin={'10px'}>
              {recipe.steps.map((step) => (
                <Box key={step.id} display="flex" alignItems="center">
                  <TextField
                    onChange={(e) => handleChangeStep(e, step.id)}
                    name="step"
                    id={`${step.id}`}
                    value={step.description}
                    label={`Step ${step.id}`}
                    variant="outlined"
                    rows={4}
                    multiline
                    sx={{
                      width: { sm: 600, md: 600 },
                      "& .MuiInputBase-root": { height: 100 }
                    }}
                  />
                  <Button startIcon={<Delete />} onClick={() => handleRemoveStep(step.id)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>

          </Box>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Submit Recipe
        </Button>

      </Form>

    </Box>
  );
};

