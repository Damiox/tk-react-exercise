
export interface RecipeData {
  title: string
  description: string
  ingredients: Array<string>
}

export interface Recipe extends RecipeData {
  id: number
}
