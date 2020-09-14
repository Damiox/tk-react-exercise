import React, { useState, useEffect } from 'react'
import RecipeForm from "../RecipeForm";
import { useParams, useHistory } from 'react-router-dom'
import { editRecipe, getRecipeDetails } from "../../data/api";
import { RecipeData } from "../../data/types";
import { Title } from '../Design/General'

const RecipeEdit = () => {
  const id = Number((useParams() as { id: string }).id)
  const history = useHistory()
  const [recipeData, setRecipeData] = useState<RecipeData>();

  async function onSave(recipeData: RecipeData) {
    try {
      await editRecipe(id, recipeData)
      history.replace('/')
    } catch (err) {
      console.error(`Error while trying to edit recipe with ID ${id}:`, err)
    }
  }

  useEffect(() => {
    async function loadRecipeDetails() {
      try {
        const recipeDataDetailed = await getRecipeDetails(id)
        setRecipeData(recipeDataDetailed)
      } catch (err) {
        console.error(`Error while trying to get recipe details for ID ${id}`, err)
      }
    }
    loadRecipeDetails()
  }, [])

  return (
    <>
      <Title>Edit Recipe</Title>
      <RecipeForm recipeData={recipeData} onSave={onSave} />
    </>
  )
}

export default RecipeEdit
