import { getRecipes, searchRecipes, getRecipeDetails, createRecipe, deleteRecipe, editRecipe } from './api'

const headers = {
  'Content-Type': 'application/json',
}

describe('Recipes API', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should get recipes', async () => {
    const recipesMock = [
      {id: 1, name: 'Recipe 1', description: 'Recipe Desc 1', ingredients: [{'name': '1'}]},
      {id: 2, name: 'Recipe 2', description: 'Recipe Desc 2', ingredients: [{'name': '2'}, {'name': '3'}]}
    ]

    const response = {
      status: 200,
      ok: true,
      json: () => Promise.resolve(recipesMock)
    }
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response))

    const recipes = await getRecipes()

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/recipes/',
      { body: undefined, headers: headers, method: 'GET' }
    )
    expect(recipes).toEqual(recipesMock)
  })

  it('should search recipes by name', async () => {
    const recipesMock = [
      {id: 1, name: 'Recipe 1', description: 'Recipe Desc 1', ingredients: [{'name': '1'}]},
      {id: 2, name: 'Recipe 2', description: 'Recipe Desc 2', ingredients: [{'name': '2'}, {'name': '3'}]}
    ]

    const response = {
      status: 200,
      ok: true,
      json: () => Promise.resolve(recipesMock)
    }
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response))

    const recipes = await searchRecipes('Recipe')

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/recipes/?name=Recipe',
      { body: undefined, headers: headers, method: 'GET' }
    )
    expect(recipes).toEqual(recipesMock)
  })

  it('should get recipe details', async () => {
    const recipeDetailsMock = {id: 1, name: 'Recipe 1', description: 'Recipe Desc 1', ingredients: [{'name': '1'}]}

    const response = {
      status: 200,
      ok: true,
      json: () => Promise.resolve(recipeDetailsMock)
    }
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response))

    const recipeDetails = await getRecipeDetails(1)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/recipes/1/',
      { body: undefined, headers: headers, method: 'GET' }
    )
    expect(recipeDetails).toEqual(recipeDetailsMock)
  })

  it('should create a new recipe', async () => {
    const recipeDataMock = {name: 'Recipe 1', description: 'Recipe Desc 1', ingredients: [{'name': '1'}]}
    const recipeDetailsMock = {id: 1, ...recipeDataMock}

    const response = {
      status: 201,
      ok: true,
      json: () => Promise.resolve(recipeDetailsMock)
    }
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response))

    const recipeDetails = await createRecipe(recipeDataMock)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/recipes/',
      { body: JSON.stringify(recipeDataMock), headers: headers, method: 'POST' }
    )
    expect(recipeDetails).toEqual(recipeDetailsMock)
  })

  it('should delete a given recipe', async () => {
    const response = {
      status: 204,
      ok: true,
      json: () => Promise.resolve()
    }
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response))

    await deleteRecipe(1)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/recipes/1/',
      { body: undefined, headers: headers, method: 'DELETE' }
    )
  })

  it('should edit a given recipe', async () => {
    const recipeDataMock = {name: 'Recipe 1', description: 'Recipe Desc 1', ingredients: [{'name': '1'}]}
    const recipeDetailsMock = {id: 1, ...recipeDataMock}

    const response = {
      status: 200,
      ok: true,
      json: () => Promise.resolve(recipeDetailsMock)
    }
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response))

    const recipeDetails = await editRecipe(1, recipeDataMock)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/recipes/1/',
      { body: JSON.stringify(recipeDataMock), headers: headers, method: 'PUT' }
    )
    expect(recipeDetails).toEqual(recipeDetailsMock)
  })
})

