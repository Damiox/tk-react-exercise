import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import RecipeCreate from "./RecipeCreate";
import { createRecipe } from '../../data/api'

jest.mock('../../data/api')
const mockedCreateRecipe = createRecipe as typeof createRecipe & jest.Mock

const setupComponent = () => {
  return render(
    <MemoryRouter initialEntries={[`/create`]}>
      <Route path='/create'>
        <RecipeCreate />
      </Route>
    </MemoryRouter>
  )
}

describe('<RecipeCreate>', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('loads empty fields at the beginning', async () => {
    const { container } = setupComponent()

    const nameHtml = container.querySelector('.recipe-name') as HTMLInputElement
    const descHtml = container.querySelector('.recipe-desc') as HTMLTextAreaElement
    const ingredientsHtml = container.querySelectorAll('.ingredient-item') as NodeListOf<HTMLDivElement>

    expect(nameHtml.value).toEqual('')
    expect(descHtml.value).toEqual('')
    expect(ingredientsHtml.length).toEqual(0)
  })

  it('creates a new recipe', async () => {
    const recipeData = {
      name: 'Recipe Name', description: 'Recipe Description',
      ingredients: [{ name: 'ingredient1'}]
    }

    const { container } = setupComponent()

    const nameHtml = container.querySelector('.recipe-name') as HTMLInputElement
    const descHtml = container.querySelector('.recipe-desc') as HTMLTextAreaElement
    const ingredientInput = container.querySelector('.ingredient') as HTMLInputElement

    // fill out the form
    fireEvent.change(nameHtml, { target: { value: recipeData.name } })
    fireEvent.change(descHtml, { target: { value: recipeData.description } })
    // add ingredient
    fireEvent.change(ingredientInput, { target: { value: recipeData.ingredients[0].name } })
    const addIngredientButton = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(addIngredientButton)

    const buttonHtml = container.querySelector('.recipe-save') as HTMLButtonElement
    fireEvent.click(buttonHtml)

    await waitFor(() => expect(mockedCreateRecipe).toBeCalledWith(recipeData))
  })

  it('can cancel the recipe creation', async () => {
    const { container } = setupComponent()

    const buttonHtml = container.querySelector('.recipe-cancel') as HTMLButtonElement
    fireEvent.click(buttonHtml)

    await waitFor(() => expect(mockedCreateRecipe).not.toHaveBeenCalled())
  })
})
