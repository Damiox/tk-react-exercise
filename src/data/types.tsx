
export interface Ingredient {
  name: string
}

export interface RecipeData {
  name: string
  description: string
  ingredients: Array<Ingredient>
}

export interface Recipe extends RecipeData {
  id: number
}
