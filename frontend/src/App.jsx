import './App.css'
import React from 'react-dom'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomeLayout from './pages/HomeLayout.jsx'
import Home, { loader as homeLoader } from './pages/Home.jsx'
import Register, { action as registerAction } from './pages/Register.jsx'
import Error from './pages/Error.jsx'
import Login, { loader as loginLoader, action as loginAction } from './pages/Login.jsx'
import ForgotPassword, { action as ForgotPasswordAction } from './pages/ForgotPassword.jsx'
import UserRecipes, { loader as userRecipesLoader } from './pages/UserRecipes.jsx'
import RecipeDetail, { loader as recipeDetailLoader } from './pages/RecipeDetail.jsx'
import RecipeInput, { loader as recipeInputLoader, action as recipeInputAction } from './pages/RecipeInput.jsx'
import UserProfile, { loader as userProfileLoader } from './pages/UserProfile.jsx'
import AdminPanelLayout from './pages/AdminPanelLayout.jsx'
import AdminPanel, { loader as adminPanelLoader } from './pages/AdminPanel.jsx'
import NotFound from './pages/NotFound.jsx';
import AppTheme from './shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { UserProvider } from './UserContext.js'

function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<HomeLayout />} errorElement={<Error />} >
            <Route index element={<Home />} loader={homeLoader} />
            <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
            <Route path="register" element={<Register />} action={registerAction} />
            <Route path="forgot-password" element={<ForgotPassword />} action={ForgotPasswordAction} />
            <Route path="recipe/:id" element={<RecipeDetail />} loader={recipeDetailLoader} />

            <Route path="recipes" element={<UserRecipes />} loader={userRecipesLoader} />
            <Route path="recipes/add" element={<RecipeInput />} loader={recipeInputLoader} action={recipeInputAction} />
            <Route path="recipes/edit/:id" element={<RecipeInput />} loader={recipeInputLoader} action={recipeInputAction} />
            <Route path="profile" element={<UserProfile />} loader={userProfileLoader} />

            <Route path='admin-panel' element={<AdminPanelLayout />} >
                <Route index element={<AdminPanel />} loader={adminPanelLoader} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>

    ))

    return (
        <UserProvider>
            <AppTheme>
                <CssBaseline enableColorScheme />
                <RouterProvider router={router} />
            </AppTheme>
        </UserProvider>

    )
}

export default App
