import React from "react";
import styled from 'styled-components/macro'

const SearchContainer = styled.div`
`

const TextInput = styled.input`
  type: text;
`

const Button = styled.button`
`

type Props = {
  onRecipesFiltered: () => void
}

const RecipeSearch = ({
  onRecipesFiltered
} : Props) => {


  return (
    <SearchContainer>
      <TextInput />
      <Button>Search</Button>
    </SearchContainer>
  )
}

export default RecipeSearch
