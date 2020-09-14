import React from 'react'
import styled from "styled-components/macro";
import RecipeForm from "../RecipeForm";
import { useParams, useHistory } from 'react-router-dom'

const Title = styled.h1`
  text-align: center;
`

const RecipeEdit = () => {
  const { id } = useParams() as { id: string }
  const history = useHistory()

  function onSave() {
    console.log('onSave for edit')
    history.replace('/')
  }

  let recipe = {id: 18, title: 'Potato Casserole', description: 'Really good food with potatoes and a lot of stuff',
    ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4', 'ingredient5', 'ingredient6']}

  return (
    <>
      <Title>Edit Recipe</Title>
      <RecipeForm recipe={recipe} onSave={onSave} />
    </>
  )
}

export default RecipeEdit
