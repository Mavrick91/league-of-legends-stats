// @flow

import { reduxForm } from 'redux-form'
import { getSummonerId } from 'app/service/summoner/action'
import Home from './Home'

function validate(value) {
  const error = {}

  if (!value.summonerName) {
    error.summonerName = 'Field required'
  }
  return error
}

function onSubmit(value, dispatch) {
  dispatch(getSummonerId(value.summonerName))
}

export default reduxForm({
  form: 'home',
  validate,
  onSubmit,
})(Home)
