import React from 'react'
import RecipeForm from "../RecipeForm";
import { useParams } from 'react-router-dom'

const RecipeEdit = () => {
  const { id } = useParams() as { id: string }
  // TODO: ADD OPTION TO REMOVE
  return (
    <>
      <h1>Recipe Detail for {id}</h1>
      <RecipeForm />
    </>
  )
}

export default RecipeEdit
