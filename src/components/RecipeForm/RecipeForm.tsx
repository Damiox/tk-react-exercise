import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router'
import { v4 as uuidv4 } from 'uuid';
import useInputState from "../../hooks/useInputState"
import { Recipe } from "../../data/types"

const Form = styled.form`
`

const Button = styled.button`
`

const TextInput = styled.input`
  type: text;
`

const Actions = styled.div`
`

type Props = {
  recipe?: Recipe
  onSave: () => void
}

const RecipeForm = ({
  recipe,
  onSave
} : Props) => {
  const history = useHistory()
  const [title, updateTitle, resetTitle] = useInputState(recipe?.title ?? "")
  const [description, updateDescription, resetDescription] = useInputState(recipe?.description ?? "")
  const [newIngredient, updateNewIngredient, resetNewIngredient] = useInputState("")
  const [ingredients, updateIngredients] = useState(recipe?.ingredients ?? [])

  function onSubmit(e: any) {
    e.preventDefault()
    onSave()
  }

  function onCancel() {
    history.push('/')
  }

  function addIngredient(e: any) {
    e.preventDefault()
    updateIngredients([...ingredients, newIngredient])
    resetNewIngredient()
  }

  function removeIngredient(ingredientToRemove: string) {
    updateIngredients(ingredients.filter(i => i !== ingredientToRemove))
  }


  return (
    <>
      <h2>Recipe Form</h2>
      <Form onSubmit={onSave}>
        <div>
          <label htmlFor="title">Title</label>
          <TextInput name="title" value={title} onChange={updateTitle} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <TextInput name="description" value={description} onChange={updateDescription} />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <TextInput name="ingredients" value={newIngredient} onChange={updateNewIngredient} />
          <Button onClick={e => addIngredient(e)}>Add</Button>

          <ul>
            {
              ingredients.map((i: string) =>
                <li key={uuidv4()}>
                  {i} <span onClick={() => removeIngredient(i)}>[x]</span>
                </li>)
            }
          </ul>
        </div>
        <Actions>
          <Button>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Actions>
      </Form>
    </>
  )
}

export default RecipeForm
