import React from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router'
import useInputState from "../../hooks/useInputState"
import { Recipe } from "../../data/types"
import IngredientsForm from "./IngredientsForm";
import { Form, Button, Label, TextInput } from '../Design'

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
  const [title, updateTitle,] = useInputState(recipe?.title ?? "")
  const [description, updateDescription,] = useInputState(recipe?.description ?? "")

  function onSubmit(e: any) {
    e.preventDefault()
    onSave()
  }

  function onCancel() {
    history.push('/')
  }

  return (
    <>
      <h2>Recipe Form</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="title">Title</Label>
          <TextInput name="title" value={title} onChange={updateTitle} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <TextInput name="description" value={description} onChange={updateDescription} />
        </div>
        <IngredientsForm recipe={recipe} />
        <Actions>
          <Button>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Actions>
      </Form>
    </>
  )
}

export default RecipeForm
