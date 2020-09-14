import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import RecipeSearch from './RecipeSearch'
import { Edit, Trash } from '@styled-icons/boxicons-regular'
import { Clickable, Title, Button } from '../Design/General'
import { Grid, Row, Col } from '../Design/Grid'
import { getRecipes, searchRecipes, deleteRecipe } from "../../data/api";
import { Recipe } from "../../data/types";

const StyledRow = styled(Row)`
  margin: 0.5rem;
  padding: 0.5rem;
  border: 0.5px solid black;
  background: azure;
  font-family: sans-serif;
  font-size: 1.1rem;
  box-shadow: 2px 2px black;
`

const RecipeList = () => {
  const history = useHistory()
  const [recipes, setRecipes] = useState<Array<Recipe>>([])

  function onRecipeCreateRequested() {
    history.push('/create')
  }

  function onRecipeEditRequested(id: number) {
    history.push(`/edit/${id}`)
  }

  async function onRecipesFiltered(name: string) {
    try {
      const recipesFiltered = await searchRecipes(name)
      setRecipes(recipesFiltered)
    } catch (err) {
      console.error(`Error while trying to search for recipes with name: ${name}`, err)
    }
  }

  async function onRecipeDeleteRequested(id: number) {
    try {
      await deleteRecipe(id)
      const newRecipes = recipes.filter(r => r.id !== id)
      setRecipes(newRecipes)
    } catch (err) {
      console.error(`Error while trying to delete recipe with ID ${id}:`, err)
    }
  }

  useEffect(() => {
    async function loadRecipes() {
      try {
        const newRecipes = await getRecipes()
        setRecipes(newRecipes)
      } catch (err) {
        console.error('Error while trying to load all recipes', err)
      }
    }
    loadRecipes()
  }, [])

  return (
    <>
      <Title>Recipe List</Title>
      <Grid>
        <Row>
          <Col size={2}><RecipeSearch onRecipesFiltered={onRecipesFiltered} /></Col>
          <Col size={1}><Button onClick={onRecipeCreateRequested}>New Recipe</Button></Col>
        </Row>
        {
          recipes.map(r =>
            <StyledRow key={r.id}>
              <Col size={2}>{r.name}</Col>
              <Col size={1}>
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
