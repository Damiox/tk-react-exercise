import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import RecipeCreate from './components/RecipeCreate';
import RecipeEdit from './components/RecipeEdit';
import RecipeList from './components/RecipeList';
import NoMatch from './components/NoMatch';

const GlobalStyle = createGlobalStyle`
  body {
    background: aliceblue;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <RecipeList />
          </Route>
          <Route exact path="/edit/:id(\d+)">
            <RecipeEdit />
          </Route>
          <Route exact path="/create">
            <RecipeCreate />
          </Route>
          <Route exact path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App