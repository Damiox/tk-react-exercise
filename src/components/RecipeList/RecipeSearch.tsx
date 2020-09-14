import React from "react";
import styled from 'styled-components/macro'
import useInputState from "../../hooks/useInputState";
import { Button, TextInput } from '../Design/FormDesign'
import { Row } from '../Design/GridDesign'

const SearchContainer = styled(Row)`
`

type Props = {
  onRecipesFiltered: (name: string) => void
}

const RecipeSearch = ({
  onRecipesFiltered
} : Props) => {
  const [name, updateName,] = useInputState("")

  function onSearch() {
    onRecipesFiltered(name)
  }

  return (
    <SearchContainer>
      <TextInput value={name} onChange={updateName} />
      <Button onClick={onSearch}>Search</Button>
    </SearchContainer>
  )
}

export default RecipeSearch
