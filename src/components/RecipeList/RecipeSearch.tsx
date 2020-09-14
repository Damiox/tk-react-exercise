import React from "react";
import styled from 'styled-components/macro'
import useInputState from "../../hooks/useInputState";

const SearchContainer = styled.div`
`

const TextInput = styled.input`
  type: text;
`

const Button = styled.button`
`

type Props = {
  onRecipesFiltered: (name: string) => void
}

const RecipeSearch = ({
  onRecipesFiltered
} : Props) => {
  const [name, updateName, _] = useInputState("")

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
