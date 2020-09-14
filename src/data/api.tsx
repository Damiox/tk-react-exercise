import { Recipe, RecipeData } from './types'

const BASE_URL = 'http://localhost:8000'

const request = (
  url: string,
  method: string,
  body?: RequestInit['body']
) => {
  return fetch(url, {method: method, body: body})
    .then((resp: Response) => {
      if (resp.status === 200) {
        return resp.json()
      } else {
        throw Promise.reject({resp})
      }
    })
    .catch(({resp, status}) => {
      return Promise.reject(
        resp
          ? resp
          : new Error(`Response not available for ${status}`)
      )
    })
}

export const getRecipes = (
): Promise<Array<Recipe>> => {
  const url = `${BASE_URL}/recipes`
  return request(url, 'GET')
}

export const searchRecipes = (
  name: string
): Promise<Array<Recipe>> => {
  const url = `${BASE_URL}/recipes/?name=${name}`
  return request(url, 'GET')
}

export const getRecipeDetails = (
  id: number
): Promise<Recipe> => {
  const url = `${BASE_URL}/recipe/${id}`
  return request(url, 'GET')
}

export const deleteRecipe = (
  id: number
) => {
  const url = `${BASE_URL}/recipe/${id}`
  return request(url, 'DELETE')
}

export const editRecipe = (
  id: number,
  recipeData: RecipeData
): Promise<Recipe> => {
  const url = `${BASE_URL}/recipe/${id}`
  return request(url, 'PUT', JSON.stringify(recipeData))
}

export const createRecipe = (
  recipeData: RecipeData
): Promise<Recipe> => {
  const url = `${BASE_URL}/recipe`
  return request(url, 'POST', JSON.stringify(recipeData))
}
