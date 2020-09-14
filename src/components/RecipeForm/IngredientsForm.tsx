import React from 'react'
import styled from 'styled-components/macro'
import { Trash } from '@styled-icons/boxicons-regular'
import { v4 as uuidv4 } from 'uuid';
import useInputState from "../../hooks/useInputState"
import { Button, Clickable, TextInput } from '../Design/FormDesign'
import { Grid, Row, Col } from '../Design/GridDesign'

const Title = styled.h4`
  text-align: center;
`

const IngredientContainer = styled(Grid)`
`

const IngredientItem = styled(Row)`
`

type Props = {
  ingredients: Array<string>,
  updateIngredients: (i: Array<string>) => void
}

const IngredientsForm = ({
  ingredients,
  updateIngredients
} : Props) => {
  const [newIngredient, updateNewIngredient, resetNewIngredient] = useInputState("")

  function addIngredient(e: any) {
    e.preventDefault()
    if (newIngredient) {
      updateIngredients([...ingredients, newIngredient])
      resetNewIngredient()
    }
  }

  function removeIngredient(ingredientToRemove: string) {
    updateIngredients(ingredients.filter(i => i !== ingredientToRemove))
  }

  return (
    <IngredientContainer>
      <Title>Ingredients</Title>
      <Row>
        <Col size={0.25}>
          <TextInput name="ingredients" value={newIngredient} onChange={updateNewIngredient} />
        </Col>
        <Col size={0.25}>
          <Button onClick={e => addIngredient(e)}>Add</Button>
        </Col>
      </Row>
      {
        ingredients.map((i: string) =>
          <IngredientItem key={uuidv4()}>
            <Col size={0.25}>{i}</Col>
            <Col size={0.25}><Clickable onClick={() => removeIngredient(i)}><Trash size={20} /></Clickable></Col>
          </IngredientItem>)
      }
    </IngredientContainer>
  )
}

export default IngredientsForm
