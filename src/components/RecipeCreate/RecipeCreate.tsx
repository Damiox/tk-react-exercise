import React from 'react'
import { useHistory } from "react-router-dom";
import RecipeForm from "../RecipeForm";
import { createRecipe } from "../../data/api";
import { RecipeData } from "../../data/types";
import { Title } from '../Design/General'

const RecipeCreate = () => {
  const history = useHistory()

  async function onSave(recipeData: RecipeData) {
    try {
      await createRecipe(recipeData)
      history.replace('/')
    } catch (err) {
      console.error('Error while trying to create a new recipe', err)
    }
  }

  return (
    <>
      <Title>Add Recipe</Title>
      <RecipeForm onSave={onSave} />
    </>
  )
}

export default RecipeCreate
