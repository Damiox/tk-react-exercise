import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IngredientsForm from "./IngredientsForm";
import { Ingredient } from "../../data/types";

describe('<IngredientsForm>', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders the initial ingredients when initializing', () => {
    const ingredients = [{"name": "ingredient 1"}, {"name": "ingredient 2"}, {"name": "ingredient 3"}]
    const onIngredientAdded = jest.fn()
    const onIngredientRemoved = jest.fn()

    const { container } = render(
      <IngredientsForm ingredients={ingredients}
                       onIngredientAdded={onIngredientAdded}
                       onIngredientRemoved={onIngredientRemoved} />
    )

    const ingredientsHtml = container.querySelectorAll('.ingredient-item') as NodeListOf<HTMLDivElement>
    expect(ingredientsHtml.length).toEqual(3)
    const ingredientsNames = Array.from(ingredients).map((i: Ingredient) => i.name)
    const ingredientsHtmlNames = Array.from(ingredientsHtml).map((i: HTMLDivElement) => i.textContent)
    expect(ingredientsHtmlNames).toEqual(ingredientsNames)
    expect(onIngredientAdded).not.toHaveBeenCalled()
    expect(onIngredientRemoved).not.toHaveBeenCalled()
  })

  it('adds a new ingredient', () => {
    const ingredients = [{"name": "ingredient 1"}, {"name": "ingredient 2"}, {"name": "ingredient 3"}]
    const ingredientToAdd = {"name": "ingredient 4"}
    const onIngredientAdded = jest.fn()
    const onIngredientRemoved = jest.fn()

    const { container } = render(
      <IngredientsForm ingredients={ingredients}
                       onIngredientAdded={onIngredientAdded}
                       onIngredientRemoved={onIngredientRemoved} />
    )

    const ingredientInput = container.querySelector('.ingredient') as HTMLInputElement
    fireEvent.change(ingredientInput, { target: { value: ingredientToAdd['name'] } })
    expect(ingredientInput.value).toEqual(ingredientToAdd['name'])

    // clicks to add the ingredient now
    const addButton = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(addButton)

    // checking the callback is invoked
    expect(onIngredientAdded).toHaveBeenCalledWith(ingredientToAdd)
    expect(onIngredientRemoved).not.toHaveBeenCalled()
    expect(ingredientInput.value).toEqual('')  // the input is reset
  })

  it('removes some ingredient', () => {
    const ingredients = [{"name": "ingredient 1"}, {"name": "ingredient 2"}, {"name": "ingredient 3"}]
    const ingredientToRemoveIndex = 2
    const onIngredientAdded = jest.fn()
    const onIngredientRemoved = jest.fn()

    const { container } = render(
      <IngredientsForm ingredients={ingredients}
                       onIngredientAdded={onIngredientAdded}
                       onIngredientRemoved={onIngredientRemoved} />
    )

    // identifying and clicking on the trash icon to remove the ingredient
    const ingredientsRemoveIconHtml =
      container.querySelectorAll('.ingredient-remove') as NodeListOf<HTMLElement>
    expect(ingredientsRemoveIconHtml.length).toEqual(3)
    fireEvent.click(ingredientsRemoveIconHtml[ingredientToRemoveIndex])

    // checking the callback is invoked
    expect(onIngredientAdded).not.toHaveBeenCalled()
    expect(onIngredientRemoved).toHaveBeenCalledWith(ingredients[ingredientToRemoveIndex])
  })
})
