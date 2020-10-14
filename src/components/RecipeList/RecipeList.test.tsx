import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import RecipeList from "./RecipeList";
import { getRecipes, searchRecipes, deleteRecipe } from '../../data/api'
import { Recipe } from "../../data/types";

jest.mock('../../data/api')
const mockedGetRecipes = getRecipes as typeof getRecipes & jest.Mock
const mockedSearchRecipes = searchRecipes as typeof searchRecipes & jest.Mock
const mockedDeleteRecipe = deleteRecipe as typeof deleteRecipe & jest.Mock

const setupComponent = () => {
  return render(
    <MemoryRouter initialEntries={[`/`]}>
      <Route path='/'>
        <RecipeList />
      </Route>
    </MemoryRouter>
  )
}

const sampleRecipes =
  [{ id: 1, name: 'Recipe Name 1', description: 'Recipe Description 1',
     ingredients: [{ name: 'ingredient1'}, { name: 'ingredient2' }] },
   { id: 2, name: 'Recipe Name 2', description: 'Recipe Description 2',
     ingredients: [{ name: 'ingredient3'}, { name: 'ingredient4' }] },
   { id: 3, name: 'Recipe Name 3', description: 'Recipe Description 3',
     ingredients: [{ name: 'ingredient5'}, { name: 'ingredient6' }] },
  ]

describe('<RecipeList>', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('loads the initial grid with recipes', async () => {
    mockedGetRecipes.mockResolvedValueOnce(sampleRecipes)

    const { container } = setupComponent()

    await waitFor(() => expect(mockedGetRecipes).toBeCalled())

    const recipeNames =
      Array.from(container.querySelectorAll('.recipe-name') as NodeListOf<HTMLDivElement>)
           .map((r: HTMLDivElement) => r.textContent)

    expect(recipeNames.length).toEqual(3)
    expect(recipeNames).toEqual(Array.from(sampleRecipes).map((i: Recipe) => i.name))
  })

  it('allows deleting a recipe', async () => {
    mockedGetRecipes.mockResolvedValueOnce(sampleRecipes)

    const { container } = setupComponent()

    await waitFor(() => expect(mockedGetRecipes).toBeCalled())

    const recipeRemoveLink = container.querySelectorAll('.recipe-remove')[0] as HTMLDivElement
    fireEvent.click(recipeRemoveLink)

    // we wanted to remove the first recipe
    await waitFor(() => expect(mockedDeleteRecipe).toHaveBeenCalledWith(sampleRecipes[0].id))

    // checking that the first recipe is excluded from the grid now
    const recipeNames =
      Array.from(container.querySelectorAll('.recipe-name') as NodeListOf<HTMLDivElement>)
           .map((r: HTMLDivElement) => r.textContent)
    expect(recipeNames.length).toEqual(sampleRecipes.length - 1)
    expect(recipeNames).toEqual(Array.from(sampleRecipes.slice(1, sampleRecipes.length)).map((i: Recipe) => i.name))
  })

  it('allows searching for a recipe', async () => {
    mockedGetRecipes.mockResolvedValueOnce(sampleRecipes)

    const { container } = setupComponent()

    await waitFor(() => expect(mockedGetRecipes).toBeCalled())

    // all sample recipes have been loaded
    expect(container.querySelectorAll('.recipe-name') as NodeListOf<HTMLDivElement>).toHaveLength(
      sampleRecipes.length
    )

    // run the search
    const recipeNameToSearch = sampleRecipes[0].name
    mockedSearchRecipes.mockResolvedValueOnce(sampleRecipes.filter(r => r.name === recipeNameToSearch))
    const recipeSearchText = container.querySelector('.recipe-search') as HTMLInputElement
    const recipeSearchButton = container.querySelector('.recipe-search-btn') as HTMLButtonElement
    fireEvent.change(recipeSearchText, { target: { value: recipeNameToSearch } })
    fireEvent.click(recipeSearchButton)
    await waitFor(() => expect(mockedSearchRecipes).toHaveBeenCalledWith(recipeNameToSearch))

    // checking that the first recipe is only included from the grid now
    const recipeNames =
      Array.from(container.querySelectorAll('.recipe-name') as NodeListOf<HTMLDivElement>)
           .map((r: HTMLDivElement) => r.textContent)
    expect(recipeNames.length).toEqual(1)
    expect(recipeNames).toEqual(Array.from(sampleRecipes.slice(0, 1).map((i: Recipe) => i.name)))
  })

})
