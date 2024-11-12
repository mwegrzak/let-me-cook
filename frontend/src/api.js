export async function getRecipes() {
    const res = await fetch("/api/recipes")
    if (!res.ok) {
        throw {
            message: "Failed to fetch recipes",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = res.json()
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
    const data = res.json()
    return data
}