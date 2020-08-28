import React from 'react'
import { useParams } from 'react-router-dom'

const RecipeForm = () => {
  const { id } = useParams() as { id: string }
  return <h1>Recipe Detail for {id}</h1>
}

export default RecipeForm
