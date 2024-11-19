import { redirect } from 'react-router-dom'

export async function getRecipes() {
    const res = await fetch("/api/recipes")
    if (!res.ok) {
        throw {
            message: "Failed to fetch recipes",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
}

export async function getRecipe(id) {
    const res = await fetch(`/api/recipe/${id}`)
    if (!res.ok) {
        throw {
            message: "Failed to fetch recipes",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
}


export async function requireAuth() {

    const isLogged = true
    if (!isLogged) {
        throw redirect("/login?message=You must login first")
    }
}