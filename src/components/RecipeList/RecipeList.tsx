import React, { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import RecipeSearch from './RecipeSearch'
import {Edit, Trash} from '@styled-icons/boxicons-regular'
import { Clickable, Button } from '../Design'

const Title = styled.h1`
  text-align: center;
`
const Grid = styled.div`
  text-align: center;
`
const Row = styled.div`
  display: flex;
  margin: 0.5rem;
  padding: 0.5rem;
`
const StyledRow = styled(Row)`
  border: 0.5px solid black;
  background: azure;
  font-family: sans-serif;
  font-size: 1.1rem;
  box-shadow: 2px 2px black;
`

const Col = styled.div`
  flex: 1;
  margin: 0.5rem;
`


const RecipeList = () => {
  const initialRecipes = [
    {id: 1, title: 'Vegetable Soup', ingredients: ['ingredient1', 'ingredient2']},
    {id: 2, title: 'Just Herbs', ingredients: ['ingredient1', 'ingredient2']},
    {id: 3, title: 'Duck Breast', ingredients: ['ingredient1', 'ingredient2']},
    {id: 4, title: 'Raspberries and Blackberries', ingredients: ['ingredient1', 'ingredient2']},
    {id: 5, title: 'Some salad', ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4', 'ingredient5']},
    {id: 6, title: 'Beef', ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4']},
    {id: 7, title: 'Chocolate 100', ingredients: ['ingredient1', 'ingredient2', 'ingredient3']},
    {id: 8, title: 'Potato Casserole', ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4', 'ingredient5', 'ingredient6']},
    {id: 9, title: 'Hot Dogs Wrap', ingredients: ['ingredient1', 'ingredient2', 'ingredient3']},
    {id: 10, title: 'Tomatoes Dish', ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4']},
    {id: 11, title: 'Vegetable Soup', ingredients: ['ingredient1', 'ingredient2']},
    {id: 12, title: 'Just Herbs', ingredients: ['ingredient1', 'ingredient2']},
    {id: 13, title: 'Duck Breast', ingredients: ['ingredient1', 'ingredient2']},
    {id: 14, title: 'Raspberries and Blackberries', ingredients: ['ingredient1', 'ingredient2']},
    {id: 15, title: 'Some salad', ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4', 'ingredient5']},
    {id: 16, title: 'Beef', ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4']},
    {id: 17, title: 'Chocolate 100', ingredients: ['ingredient1', 'ingredient2', 'ingredient3']},
    {id: 18, title: 'Potato Casserole', ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4', 'ingredient5', 'ingredient6']},
    {id: 19, title: 'Hot Dogs Wrap', ingredients: ['ingredient1', 'ingredient2', 'ingredient3']},
    {id: 20, title: 'Tomatoes Dish', ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4']}
  ]
  const history = useHistory()
  const [recipes, setRecipes] = useState(initialRecipes)

  function onRecipesFiltered(name: string) {
    if (name) {
      console.log('onRecipesFiltered: ' + name)
    }
  }

  function onRecipeCreateRequested() {
    history.push('/create')
  }

  function onRecipeEditRequested(id: number) {
    history.push(`/edit/${id}`)
  }

  function onRecipeDeleteRequested(id: number) {
    console.log('onRecipeDeleteRequested: ' + id)
  }

  return (
    <>
      <Title>Recipe List</Title>
      <Grid>
        <Row>
          <Col><RecipeSearch onRecipesFiltered={onRecipesFiltered} /></Col>
          <Col><Button onClick={onRecipeCreateRequested}>New Recipe</Button></Col>
        </Row>
        {
          recipes.map(r =>
            <StyledRow key={r.id}>
              <Col>{r.title}</Col>
              <Col>
                <Clickable onClick={() => onRecipeEditRequested(r.id)}><Edit size={24} /></Clickable>
                <Clickable onClick={() => onRecipeDeleteRequested(r.id)}><Trash size={24} /></Clickable>
              </Col>
            </StyledRow>
          )
        }
      </Grid>
    </>
  )
}

export default RecipeList
