import './App.css'
import React from 'react-dom'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomeLayout from './pages/HomeLayout.jsx'
import Home, { loader as homeLoader } from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Error from './pages/Error.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import UserRecipes, { loader as userRecipesLoader } from './pages/UserRecipes.jsx'
import RecipeDetail, { loader as recipeDetailLoader } from './pages/RecipeDetail.jsx'
import RecipeInput, { loader as recipeInputLoader } from './pages/RecipeInput.jsx'
import UserProfile, { loader as userProfileLoader } from './pages/UserProfile.jsx'
import AdminPanelLayout from './pages/AdminPanelLayout.jsx'
import AdminPanel, { loader as adminPanelLoader } from './pages/AdminPanel.jsx'
import NotFound from './pages/NotFound.jsx';
import AppTheme from './shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';

import "./server"

function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<HomeLayout />} errorElement={<Error />} >
            <Route index element={<Home />} loader={homeLoader} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="recipe/:id" element={<RecipeDetail />} loader={recipeDetailLoader} />
            <Route path="recipes" element={<UserRecipes />} loader={userRecipesLoader} />
            <Route path="recipes/add" element={<RecipeInput />} loader={recipeInputLoader} />
            <Route path="recipes/modify/:id" element={<RecipeInput />} loader={recipeInputLoader} />
            <Route path="profile" element={<UserProfile />} loader={userProfileLoader} />

            <Route path='admin-panel' element={<AdminPanelLayout />} >
                <Route index element={<AdminPanel />} loader={adminPanelLoader} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>

    ))

    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <RouterProvider router={router} />
        </AppTheme>

    )
}

export default App
