import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import RecipeEdit from "./RecipeEdit";
import { getRecipeDetails, editRecipe } from '../../data/api'
import {Ingredient} from "../../data/types";

jest.mock('../../data/api')
const mockedGetRecipeDetails = getRecipeDetails as typeof getRecipeDetails & jest.Mock
const mockedEditRecipe = editRecipe as typeof editRecipe & jest.Mock

const setupComponent = (recipeId: number) => {
  return render(
    <MemoryRouter initialEntries={[`/edit/${recipeId}`]}>
      <Route path='/edit/:id'>
        <RecipeEdit />
      </Route>
    </MemoryRouter>
  )
}

const sampleRecipe = {
  id: 5, name: 'Recipe Name', description: 'Recipe Description',
  ingredients: [{ name: 'ingredient1'}, { name: 'ingredient2' }]
}

describe('<RecipeEdit>', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('loads the recipe details at the beginning', async () => {
    mockedGetRecipeDetails.mockResolvedValueOnce(sampleRecipe)

    const { container } = setupComponent(sampleRecipe.id)

    await waitFor(() => expect(mockedGetRecipeDetails).toBeCalledWith(sampleRecipe.id))

    const nameHtml = container.querySelector('.recipe-name') as HTMLInputElement
    const descHtml = container.querySelector('.recipe-desc') as HTMLTextAreaElement
    const ingredientsHtml = container.querySelectorAll('.ingredient-item') as NodeListOf<HTMLDivElement>

    expect(nameHtml.value).toEqual(sampleRecipe.name)
    expect(descHtml.value).toEqual(sampleRecipe.description)
    expect(ingredientsHtml.length).toEqual(sampleRecipe.ingredients.length)
    const ingredientsNames = Array.from(sampleRecipe.ingredients).map((i: Ingredient) => i.name)
    const ingredientsHtmlNames = Array.from(ingredientsHtml).map((i: HTMLDivElement) => i.textContent)
    expect(ingredientsHtmlNames).toEqual(ingredientsNames)
  })

  it('updates the recipe details', async () => {
    mockedGetRecipeDetails.mockResolvedValueOnce(sampleRecipe)

    const { container } = setupComponent(sampleRecipe.id)

    await waitFor(() => expect(mockedGetRecipeDetails).toBeCalledWith(sampleRecipe.id))

    const buttonHtml = container.querySelector('.recipe-save') as HTMLButtonElement
    fireEvent.click(buttonHtml)

    await waitFor(() => expect(mockedEditRecipe).toBeCalledWith(sampleRecipe.id, sampleRecipe))
  })

  it('can cancel the recipe edition', async () => {
    mockedGetRecipeDetails.mockResolvedValueOnce(sampleRecipe)

    const { container } = setupComponent(sampleRecipe.id)

    await waitFor(() => expect(mockedGetRecipeDetails).toBeCalledWith(sampleRecipe.id))

    const buttonHtml = container.querySelector('.recipe-cancel') as HTMLButtonElement
    fireEvent.click(buttonHtml)

    await waitFor(() => expect(mockedEditRecipe).not.toHaveBeenCalled())
  })
})
