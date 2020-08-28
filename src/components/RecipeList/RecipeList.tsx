import React from 'react'
import { useLocation } from 'react-router-dom'

const RecipeList = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  return <h1>Recipe List searching for {searchParams.get('name')}</h1>
}

export default RecipeList
