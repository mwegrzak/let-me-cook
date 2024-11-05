import './App.css'
import React from 'react-dom'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import HomeLayout from './pages/HomeLayout.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import RecipeInput from './pages/RecipeInput.jsx'
import UserPanel from './pages/UserPanel.jsx'
import AdminPanelLayout from './pages/AdminPanelLayout.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import NotFound from './pages/NotFound.jsx';
import "./server"

function App() {

    return (
        <BrowserRouter>
            <CssBaseline />
            <Routes>
                <Route path='/' element={<HomeLayout />} >
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="recipes" element={<Recipes />} />
                    <Route path="recipe/add" element={<RecipeInput />} />
                    <Route path="recipe/:id" element={<RecipeDetail />} />
                    <Route path="recipe/:id/modify" element={<RecipeInput />} />
                    <Route path="user-panel" element={<UserPanel />} />

                    <Route path='admin-panel' element={<AdminPanelLayout />} >
                        <Route index element={<AdminPanel />} />
                        <Route path='users:id' element={<UserPanel />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
