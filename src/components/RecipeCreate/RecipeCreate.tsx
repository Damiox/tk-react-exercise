import React from 'react'
import { useHistory } from "react-router-dom";
import RecipeForm from "../RecipeForm";

const RecipeCreate = () => {
  const history = useHistory()

  function onSave() {
    console.log('onSave for create')
    history.push('/')
  }

  return (
    <>
      <h1>Recipe Create</h1>
      <RecipeForm onSave={onSave} />
    </>
  )
}

export default RecipeCreate
