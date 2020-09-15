import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import RecipeForm from "./RecipeForm";

describe('<RecipeForm>', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders the form with initial values', () => {
    const recipeData = { name: 'Recipe Name', description: 'Recipe Description', ingredients: [] }
    const onSave = jest.fn()

    const { container } = render(<RecipeForm recipeData={recipeData} onSave={onSave} />)

    const textInputHtml = container.querySelector('.recipe-name') as HTMLInputElement
    expect(textInputHtml).toBeInTheDocument()
    expect(textInputHtml.value).toEqual(recipeData.name)
    const textInputAreaHtml = container.querySelector('.recipe-desc') as HTMLTextAreaElement
    expect(textInputAreaHtml).toBeInTheDocument()
    expect(textInputAreaHtml.value).toEqual(recipeData.description)
    expect(onSave).not.toHaveBeenCalled()
  })

  it('submits the form', () => {
    const recipeData = { name: 'Recipe Name', description: 'Recipe Description',
                         ingredients: [{"name": "ingredient 1"}] }
    const newRecipeData = { ...recipeData, name: 'New Recipe Name', description: 'New Recipe Description' }
    const onSave = jest.fn()

    const { container } = render(<RecipeForm recipeData={recipeData} onSave={onSave} />)

    const textInputHtml = container.querySelector('.recipe-name') as HTMLInputElement
    fireEvent.change(textInputHtml, { target: { value: newRecipeData.name } })
    const textInputAreaHtml = container.querySelector('.recipe-desc') as HTMLTextAreaElement
    fireEvent.change(textInputAreaHtml, { target: { value: newRecipeData.description } })

    const buttonSaveHtml = container.querySelector('.recipe-save') as HTMLButtonElement
    fireEvent.click(buttonSaveHtml)
    expect(onSave).toBeCalledWith(newRecipeData)
  })

  it('disables the save button if form is invalid', () => {
    const recipeData = { name: 'Recipe Name', description: 'Recipe Description',
                         ingredients: [{"name": "ingredient 1"}] }
    const onSave = jest.fn()

    const { container } = render(<RecipeForm recipeData={recipeData} onSave={onSave} />)

    const textInputHtml = container.querySelector('.recipe-name') as HTMLInputElement
    const textInputAreaHtml = container.querySelector('.recipe-desc') as HTMLTextAreaElement

    // the form has data, so it can be submitted
    const buttonSaveHtml = container.querySelector('.recipe-save') as HTMLButtonElement
    expect(buttonSaveHtml.disabled).toBeFalsy()

    // test button is disabled if no name is present
    fireEvent.change(textInputHtml, { target: { value: '' } })
    expect(buttonSaveHtml.disabled).toBeTruthy()
    fireEvent.change(textInputHtml, { target: { value: recipeData.name } })
    expect(buttonSaveHtml.disabled).toBeFalsy()

    // test button is disabled if no description is present
    fireEvent.change(textInputAreaHtml, { target: { value: '' } })
    expect(buttonSaveHtml.disabled).toBeTruthy()
    fireEvent.change(textInputAreaHtml, { target: { value: recipeData.description } })
    expect(buttonSaveHtml.disabled).toBeFalsy()
  })

  it('disables the save button if there are no ingredients', () => {
    const recipeData = { name: 'Recipe Name', description: 'Recipe Description', ingredients: [] }
    const onSave = jest.fn()

    const { container } = render(<RecipeForm recipeData={recipeData} onSave={onSave} />)

    // the form doesn't have ingredients, so it cannot be submitted
    const buttonSaveHtml = container.querySelector('.recipe-save') as HTMLButtonElement
    expect(buttonSaveHtml.disabled).toBeTruthy()
  })
})

