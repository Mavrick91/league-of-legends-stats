// @flow

import React from 'react'
import { Form } from 'redux-form'
import type { formPropTypes } from 'redux-form'
import TextFieldInput from 'app/components/TextField'

function Home({ handleSubmit }: formPropTypes) {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <TextFieldInput name="summonerName" />
      </Form>
    </div>
  )
}

export default Home
