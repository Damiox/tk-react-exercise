import React, { FormEvent, MouseEvent, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router'
import useInputState from '../../hooks/useInputState'
import { Ingredient, RecipeData } from '../../data/types'
import IngredientsForm from './IngredientsForm';
import { Form, Button, Label, TextInput, TextArea } from '../Design/General'
import { Grid, Row, Col } from '../Design/Grid'

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
  const [name, handleName, setName] = useInputState('')
  const [description, handleDescription, setDescription] = useInputState('')
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([])

  useEffect(() => {
    // This data is loaded from the backend API, and once it's ready the child will be updated
    setName(recipeData?.name ?? '')
    setDescription(recipeData?.description ?? '')
    setIngredients(recipeData?.ingredients ?? [])

  }, [recipeData, setName, setDescription])

  function isInvalid() {
    return name === '' || description === '' || ingredients.length === 0
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    let newRecipeData = {
      ...recipeData,
      name: name,
      description: description,
      ingredients: ingredients
    }
    onSave(newRecipeData)
  }

  function onCancel(e: MouseEvent) {
    e.preventDefault()
    history.push('/')
  }

  function onIngredientAdded(ingredientToAdd: Ingredient) {
    setIngredients(
      prevIngredients => [...prevIngredients, ingredientToAdd]
    )
  }

  function onIngredientRemoved(ingredientToRemove: Ingredient) {
    setIngredients(
      prevIngredients => prevIngredients.filter(i => i.name !== ingredientToRemove.name)
    )
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormGrid>
          <Row>
            <Col size={0.30}>
              <Label htmlFor="name">Name</Label>
            </Col>
            <Col size={0.50}>
              <TextInput className="recipe-name" name="name" value={name}
                         onChange={handleName} required />
            </Col>
          </Row>
          <Row>
            <Col size={0.30}>
              <Label htmlFor="description">Description</Label>
            </Col>
            <Col size={0.50}>
              <TextArea className="recipe-desc" name="description" value={description}
                        onChange={handleDescription} required />
            </Col>
          </Row>

          <Row>
            <Col size={1}>
              <IngredientsForm ingredients={ingredients}
                               onIngredientAdded={onIngredientAdded}
                               onIngredientRemoved={onIngredientRemoved} />
            </Col>
          </Row>

          <Row>
            <Col size={1}>
              <ActionButton className="recipe-save" disabled={isInvalid()}>Save</ActionButton>
              <ActionButton onClick={onCancel}>Cancel</ActionButton>
            </Col>
          </Row>
        </FormGrid>
      </Form>
    </>
  )
}

export default RecipeForm
