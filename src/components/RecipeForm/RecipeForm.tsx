import React, {useState} from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router'
import useInputState from "../../hooks/useInputState"
import { RecipeData } from "../../data/types"
import IngredientsForm from "./IngredientsForm";
import { Form, Button, Label, TextInput, TextArea } from '../Design/FormDesign'
import { Grid, Row, Col } from '../Design/GridDesign'

const Title = styled.h3`
  text-align: center;
`

const FormGrid = styled(Grid)`
  text-align: center;
`

const ActionButton = styled(Button)`
  margin: 1rem;
`

type Props = {
  recipeData?: RecipeData
  onSave: (r: RecipeData) => void
}

const RecipeForm = ({
  recipeData,
  onSave
} : Props) => {
  const history = useHistory()
  const [title, updateTitle,] = useInputState(recipeData?.title ?? "")
  const [description, updateDescription,] = useInputState(recipeData?.description ?? "")
  const [ingredients, updateIngredients] = useState(recipeData?.ingredients ?? [])

  function onSubmit(e: any) {
    e.preventDefault()
    let newRecipeData = {
      ...recipeData,
      title: title,
      description: description,
      ingredients: ingredients
    }
    onSave(newRecipeData)
  }

  function onCancel() {
    history.push('/')
  }

  return (
    <>
      <Title>Recipe Details</Title>
      <Form onSubmit={onSubmit}>
        <FormGrid>
          <Row>
            <Col size={0.25}>
              <Label htmlFor="title">Title</Label>
            </Col>
            <Col size={0.25}>
              <TextInput name="title" value={title} onChange={updateTitle} />
            </Col>
          </Row>
          <Row>
            <Col size={0.25}>
              <Label htmlFor="description">Description</Label>
            </Col>
            <Col size={0.25}>
              <TextArea name="description" value={description} onChange={updateDescription} />
            </Col>
          </Row>

          <IngredientsForm ingredients={ingredients} updateIngredients={updateIngredients} />

          <Row>
            <Col size={0.50}>
              <ActionButton>Save</ActionButton>
              <ActionButton onClick={onCancel}>Cancel</ActionButton>
            </Col>
          </Row>
        </FormGrid>
      </Form>
    </>
  )
}

export default RecipeForm
