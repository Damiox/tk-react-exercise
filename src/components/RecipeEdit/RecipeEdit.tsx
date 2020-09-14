import React, {useEffect} from 'react'
import styled from "styled-components/macro";
import RecipeForm from "../RecipeForm";
import { useParams, useHistory } from 'react-router-dom'
import { editRecipe, getRecipeDetails } from "../../data/api";
import { RecipeData } from "../../data/types";

const Title = styled.h1`
  text-align: center;
`

const RecipeEdit = () => {
  const id = Number((useParams() as { id: string }).id)
  const history = useHistory()
  let recipeData;

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
      recipeData = await getRecipeDetails(id)
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
