// @flow

import { reduxForm } from 'redux-form'
import Home from './Home'

function validate(value) {
  const error = {}

  if (!value.summonerName) {
    error.summonerName = 'Field required'
  }
  return error
}

function onSubmit(value, _, { history }) {
  history.push(`/dashboard/${value.summonerName}`)
}

export default reduxForm({
  form: 'home',
  validate,
  onSubmit,
})(Home)
