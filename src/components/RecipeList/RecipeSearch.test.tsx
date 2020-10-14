import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import RecipeSearch from "./RecipeSearch";

describe('<RecipeSearch>', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('has an empty value when initializing', () => {
    const onRecipesFiltered = jest.fn()

    const { container } = render(<RecipeSearch onRecipesFiltered={onRecipesFiltered}/>)

    const searchInput = container.querySelector('.recipe-search') as HTMLInputElement
    expect(searchInput.textContent).toEqual('')
  })

  it('tries to search', () => {
    const onRecipesFiltered = jest.fn()

    const { container } = render(<RecipeSearch onRecipesFiltered={onRecipesFiltered}/>)

    const searchInput = container.querySelector('.recipe-search') as HTMLInputElement
    const testValue = 'Some Prefix'
    fireEvent.change(searchInput, { target: { value: testValue } })
    expect(searchInput.value).toEqual(testValue)
    expect(onRecipesFiltered).not.toHaveBeenCalled()

    // clicks to search now
    const searchButton = container.querySelector('.recipe-search-btn') as HTMLButtonElement
    fireEvent.click(searchButton)
    expect(onRecipesFiltered).toBeCalledWith(testValue)
  })
})
