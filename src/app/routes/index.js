import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from 'app/store'
import Home from 'app/screen/Home'
import Dashboard from 'app/screen/Dashboard'

export default () => (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path={['/dashboard/:summonerName', '/dashboard']}
        component={Dashboard}
      />
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
)
