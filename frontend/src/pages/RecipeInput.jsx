import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Form, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Typography, Box, Checkbox, Card, CardContent, Input, CardMedia, CardActions } from '@mui/material';
import { Add, CardTravel, Delete } from '@mui/icons-material';
import { fetchGet, fetchPost, fetchPut } from '../utils/api';
import { useUser } from '../UserContext';
import placeholderDish from '../images/food-plate.png'

let nextIngredient = 2
let nextDirection = 2
export default function RecipeInput() {

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, user } = useUser()
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    photo: placeholderDish,
    ingredients: [{ id: 1, content: '' }],
    directions: [{ id: 1, content: '' }],
    difficulty: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    isPublic: false,
    tags: ''
  })


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
      ingredients: [...recipe.ingredients, { id: nextIngredient++, content: "" }]
    });
  };

  const handleRemoveIngredient = (e) => {
    if (recipe.ingredients.length > 1) {
      nextIngredient--
      setRecipe({
        ...recipe,
        ingredients: recipe.ingredients.filter(ingr => ingr.id != nextIngredient)
      });
    }
  };

  const handleAddDirection = () => {
    setRecipe({
      ...recipe,
      directions: [...recipe.directions, { id: nextDirection++, content: "" }]
    })
  };

  const handleRemoveDirection = (e) => {
    if (recipe.directions.length > 1) {
      nextDirection--
      setRecipe({
        ...recipe,
        directions: recipe.directions.filter(dir => dir.id != nextDirection)
      });
    }
  };

  const handlePhotoUpload = (e) => {
    setRecipe({ ...recipe, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRecipe(values => ({ ...values, [name]: value }))
  }

  const handleChangeIngredients = (e) => {
    const nextIngredients = recipe.ingredients.map((ingredient) => {
      if (ingredient.id == e.target.id) {
        ingredient.content = e.target.value
      }
      return ingredient
    })

    setRecipe({ ...recipe, ingredients: nextIngredients });
  };

  const handleChangeDirection = (e) => {
    const nextDirections = recipe.directions.map((direction) => {
      if (direction.id == e.target.id) {
        direction.content = e.target.value
      }
      return direction
    })

    setRecipe({ ...recipe, directions: nextDirections });
  };

  const handleSubmit = (e) => {
    console.log(recipe)
    e.preventDefault()
    if (location.pathname.includes('my-recipes/edit')) {
      const response = fetchPut(`/api/recipe/${params.id}`, recipe)
      console.log(response)
    }
    else {
      const response = fetchPost(`/api/recipe`, recipe)
      console.log(response)
      if (response.ok) {
        navigate('/my-recipes?message=Recipe added')
      }
    }
  }

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4 }}>

      <Form onSubmit={handleSubmit} >

        <Typography variant="h5" mb={2}>Add New Recipe</Typography>
        <TextField onChange={handleChange} fullWidth label="Title" name="title" id="title" value={recipe.title} variant="outlined" margin="normal" />
        <TextField onChange={handleChange} fullWidth label="Recipe Description" name="description" value={recipe.description} variant="outlined" margin="normal" />

        <Box display={'flex'} justifyContent={'space-evenly'}>
          <Box>
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
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField onChange={handleChange} fullWidth label="Servings" name="servings" value={recipe.servings} type="number" variant="outlined" margin="normal" />
                </Box>
                <Box display={'flex'}>

                  <TextField onChange={handleChange} fullWidth label="Prep Time (minutes)" name="prepTime" value={recipe.prepTime} type="number" variant="outlined" margin="normal" />
                  <TextField onChange={handleChange} fullWidth label="Cook Time (minutes)" name="cookTime" value={recipe.cookTime} type="number" variant="outlined" margin="normal" />
                </Box>

                Make recipe public
                <Checkbox name="isPublic" label="isPublic" defaultChecked={recipe.isPublic} />
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
            <Button startIcon={<Delete />} onClick={handleRemoveIngredient} >
              Delete Ingredient
            </Button>

            {recipe.ingredients.map((ingredient) => (
              <TextField
                fullWidth
                onChange={handleChangeIngredients}
                key={ingredient.id}
                id={`${ingredient.id}`}
                name="ingredient"
                value={ingredient.content}
                label={`Ingredient ${ingredient.id}`}
                variant="outlined"
              />
            ))}

          </Box>

          <Box display="block" alignItems="center" maxWidth={'40em'} mt={1}>
            <Typography variant="subtitle1" mt={2}>Directions</Typography>
            <Button startIcon={<Add />} onClick={handleAddDirection} sx={{ mt: 1 }}>
              Add direction
            </Button>
            <Button startIcon={<Delete />} onClick={handleRemoveDirection}>
              Delete direction
            </Button>
            <Box margin={'10px'}>
              {recipe.directions.map((direction) => (
                <TextField
                  onChange={handleChangeDirection}
                  name="direction"
                  key={direction.id}
                  id={`${direction.id}`}
                  value={direction.content}
                  label={`Direction ${direction.id}`}
                  variant="outlined"
                  rows={4}
                  multiline
                  sx={{
                    width: { sm: 600, md: 600 },
                    "& .MuiInputBase-root": { height: 100 }
                  }}
                />
              ))}
            </Box>

          </Box>
        </Box>

        <TextField onChange={handleChange} fullWidth label="Tags" name="tags" value={recipe.tags} helperText="Separate tags with commas" variant="outlined" margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Submit Recipe
        </Button>

      </Form>

    </Box>
  );
};

