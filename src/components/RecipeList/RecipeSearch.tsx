import React from "react";
import styled from 'styled-components/macro'
import useInputState from "../../hooks/useInputState";
import { Button, TextInput } from '../Design'

const SearchContainer = styled.div`
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
