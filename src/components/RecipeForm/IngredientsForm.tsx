import React, { MouseEvent, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components/macro'
import { Trash } from '@styled-icons/boxicons-regular'
import { v4 as uuidv4 } from 'uuid';
import useInputState from '../../hooks/useInputState'
import { Button, Clickable, TextInput } from '../Design/General'
import { Grid, Row, Col } from '../Design/Grid'
import { Ingredient } from '../../data/types';

const Title = styled.div`
  text-align: center;
  padding: 0.75rem;
  font-size: 1.25rem;
`

const IngredientContainer = styled(Grid)`
  border: 1px solid black;
  margin: 1.5rem;
`

const IngredientItem = styled(Row)`
  margin: 0;
  padding: 0.25rem;
`

type Props = {
  ingredients: Array<Ingredient>,
  setIngredientList: Dispatch<SetStateAction<Array<Ingredient>>>
}

const IngredientsForm = ({
  ingredients,
  setIngredientList
} : Props) => {
  const [newIngredient, updateNewIngredient, setNewIngredient] = useInputState('')

  function addIngredient(e: MouseEvent) {
    e.preventDefault()
    if (newIngredient) {
      setIngredientList(
        prevIngredients => [...prevIngredients, { 'name': newIngredient }]
      )
      setNewIngredient('')
    }
  }

  function removeIngredient(ingredientToRemove: Ingredient) {
    setIngredientList(
      prevIngredients => prevIngredients.filter(i => i.name !== ingredientToRemove.name)
    )
  }

  return (
    <IngredientContainer>
      <Title>Ingredients</Title>
      <Row>
        <Col size={0.50}>
          <TextInput name="ingredients" value={newIngredient} onChange={updateNewIngredient} />
        </Col>
        <Col size={0.25}>
          <Button onClick={e => addIngredient(e)}>Add</Button>
        </Col>
      </Row>
      {
        ingredients.map((i: Ingredient) =>
          <IngredientItem key={uuidv4()}>
            <Col size={0.50}>{i.name}</Col>
            <Col size={0.25}><Clickable onClick={() => removeIngredient(i)}><Trash size={20} /></Clickable></Col>
          </IngredientItem>)
      }
    </IngredientContainer>
  )
}

export default IngredientsForm
