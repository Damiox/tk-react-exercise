import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import RecipeEdit from "./RecipeEdit";
import { getRecipeDetails, editRecipe } from '../../data/api'
import {Ingredient} from "../../data/types";

jest.mock('../../data/api')
const mockedGetRecipeDetails = getRecipeDetails as typeof getRecipeDetails & jest.Mock
const mockedEditRecipe = editRecipe as typeof editRecipe & jest.Mock

describe('<RecipeEdit>', () => {
  it('loads the recipe details at the beginning', async () => {
    const recipeId = 5
    const recipeDetails = {
      id: recipeId, name: 'Recipe Name', description: 'Recipe Description',
      ingredients: [{ name: 'ingredient1'}, { name: 'ingredient2' }]
    }

    mockedGetRecipeDetails.mockResolvedValueOnce(recipeDetails)

    const { container } = render(
      <MemoryRouter initialEntries={[`/edit/${recipeId}`]}>
        <Route path='/edit/:id'>
          <RecipeEdit />
        </Route>
      </MemoryRouter>
    )

    await waitFor(() => expect(mockedGetRecipeDetails).toBeCalledWith(recipeId))

    const nameHtml = container.querySelector('.recipe-name') as HTMLInputElement
    const descHtml = container.querySelector('.recipe-desc') as HTMLTextAreaElement
    const ingredientsHtml = container.querySelectorAll('.ingredient-item') as NodeListOf<HTMLDivElement>

    expect(nameHtml.value).toEqual(recipeDetails.name)
    expect(descHtml.value).toEqual(recipeDetails.description)
    expect(ingredientsHtml.length).toEqual(recipeDetails.ingredients.length)
    const ingredientsNames = Array.from(recipeDetails.ingredients).map((i: Ingredient) => i.name)
    const ingredientsHtmlNames = Array.from(ingredientsHtml).map((i: HTMLDivElement) => i.textContent)
    expect(ingredientsHtmlNames).toEqual(ingredientsNames)
  })

  it('updates the recipe details', async () => {
    const recipeId = 5
    const recipeDetails = {
      id: recipeId, name: 'Recipe Name', description: 'Recipe Description',
      ingredients: [{ name: 'ingredient1'}, { name: 'ingredient2' }]
    }

    mockedGetRecipeDetails.mockResolvedValueOnce(recipeDetails)

    const { container } = render(
      <MemoryRouter initialEntries={[`/edit/${recipeId}`]}>
        <Route path='/edit/:id'>
          <RecipeEdit />
        </Route>
      </MemoryRouter>
    )

    await waitFor(() => expect(mockedGetRecipeDetails).toBeCalledWith(recipeId))

    const buttonHtml = container.querySelector('.recipe-save') as HTMLButtonElement
    fireEvent.click(buttonHtml)

    await waitFor(() => expect(mockedEditRecipe).toBeCalledWith(recipeId, recipeDetails))
  })
})
