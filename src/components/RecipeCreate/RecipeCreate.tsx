import React from 'react'
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import RecipeForm from "../RecipeForm";

const Title = styled.h1`
  text-align: center;
`

const RecipeCreate = () => {
  const history = useHistory()

  function onSave() {
    console.log('onSave for create')
    history.push('/')
  }

  return (
    <>
      <Title>Add Recipe</Title>
      <RecipeForm onSave={onSave} />
    </>
  )
}

export default RecipeCreate
