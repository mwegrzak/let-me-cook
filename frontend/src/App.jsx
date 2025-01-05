import './App.css'
import React from 'react-dom'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import { UserProvider, useUser } from './UserContext.jsx'

import AppTheme from './shared-theme/AppTheme';
import NotFound from './pages/NotFound.jsx';
import Error from './pages/Error.jsx'
import HomeLayout from './pages/HomeLayout.jsx'
import Home from './pages/Home.jsx'
import Register, { action as registerAction } from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword, { action as ForgotPasswordAction } from './pages/ForgotPassword.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'

import RequireAuth from './pages/RequireAuth.jsx'
import RecipeInput from './pages/RecipeInput.jsx'
import UserRecipes from './pages/UserRecipes.jsx'
import UserProfile from './pages/UserProfile.jsx'

import AdminPanelLayout from './pages/AdminPanelLayout.jsx'
import AdminPanelDashboard from './pages/AdminPanelDashboard.jsx'
import UserList from './pages/UserList.jsx'



function App() {
    const { isLoggedIn, user } = useUser()


    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<HomeLayout />} errorElement={<Error />} >

            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} action={registerAction} />
            <Route path="forgot-password" element={<ForgotPassword />} action={ForgotPasswordAction} />
            <Route path="recipe/:id" element={<RecipeDetail />} />

            <Route path='my-recipes' element={<RequireAuth />}>
                <Route index element={<UserRecipes />} />
                <Route path="add" element={<RecipeInput />} />
                <Route path="edit/:id" element={<RecipeInput />} />
            </Route>


            <Route path='user' element={<RequireAuth />}>
                <Route index element={<UserProfile />} />
            </Route>

            <Route path='admin' element={<AdminPanelLayout />} >
                <Route index element={<AdminPanelDashboard />} />
                <Route path="users" element={<UserList />} />
                <Route path="users/:id" element={<UserProfile />} />
                <Route path="recipes" element={<UserRecipes />} />
                <Route path="recipes/:id" element={<RecipeInput />} />
            </Route>

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
