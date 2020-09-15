import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import RecipeSearch from "./RecipeSearch";

describe('<RecipeSearch>', () => {
  it('has an empty value when initializing', () => {
    const onRecipesFiltered = jest.fn()

    let app: HTMLElement | undefined
    act(() => {
      const { container } = render(<RecipeSearch onRecipesFiltered={onRecipesFiltered}/>)
      app = container
    })

    if (app) {
      const searchInput = app.querySelector('input[type=text]')
      expect(searchInput!.textContent).toEqual('')
    }
  })

  it('tries to search', () => {
    const onRecipesFiltered = jest.fn()

    let app: HTMLElement | undefined
    act(() => {
      const { container } = render(<RecipeSearch onRecipesFiltered={onRecipesFiltered}/>)
      app = container
    })

    if (app) {
      const searchInput = app.querySelector('input[type=text]') as HTMLInputElement
      const testValue = 'Some Prefix'
      fireEvent.change(searchInput, { target: { value: testValue } })
      expect(searchInput.value).toEqual(testValue)
      expect(onRecipesFiltered).not.toHaveBeenCalled()

      // clicks to search now
      const searchButton = app.querySelector('button') as HTMLButtonElement
      fireEvent.click(searchButton)
      expect(onRecipesFiltered).toBeCalledWith(testValue)
    }
  })
})

