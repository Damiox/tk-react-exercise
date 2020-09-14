import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Trash } from '@styled-icons/boxicons-regular'
import { v4 as uuidv4 } from 'uuid';
import useInputState from "../../hooks/useInputState"
import { Recipe } from "../../data/types"
import { Button, Clickable, Label, TextInput } from '../Design'

const IngredientContainer = styled.ul`
`

const IngredientItem = styled.li`
`

type Props = {
  recipe?: Recipe
}

const IngredientsForm = ({
  recipe
} : Props) => {
  const [newIngredient, updateNewIngredient, resetNewIngredient] = useInputState("")
  const [ingredients, updateIngredients] = useState(recipe?.ingredients ?? [])

  function addIngredient(e: any) {
    e.preventDefault()
    updateIngredients([...ingredients, newIngredient])
    resetNewIngredient()
  }

  function removeIngredient(ingredientToRemove: string) {
    updateIngredients(ingredients.filter(i => i !== ingredientToRemove))
  }

  return (
    <div>
      <Label htmlFor="ingredients">Ingredients</Label>
      <TextInput name="ingredients" value={newIngredient} onChange={updateNewIngredient} />
      <Button onClick={e => addIngredient(e)}>Add</Button>

      <IngredientContainer>
        {
          ingredients.map((i: string) =>
            <IngredientItem key={uuidv4()}>
              {i} <Clickable onClick={() => removeIngredient(i)}><Trash size={20} /></Clickable>
            </IngredientItem>)
        }
      </IngredientContainer>
    </div>
  )
}

export default IngredientsForm
