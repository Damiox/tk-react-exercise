import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import NoMatch from "./components/NoMatch";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <RecipeList />
        </Route>
        <Route exact path="/detail/:id(\d+)">
          <RecipeForm />
        </Route>
        <Route exact path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}

export default App