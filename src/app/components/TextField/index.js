// @flow

import React from 'react'
import { Field } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import type { fieldPropTypes } from 'redux-form'

type Props = {
  name: string,
  label?: string,
}

type customFieldPropTypes = Props & fieldPropTypes

function CustomInput({ input, meta, name, label }: customFieldPropTypes) {
  return (
    <>
      <TextField type="text" label={label} id={name} {...input} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  )
}

function TextFieldConnected({ name, label }: Props) {
  return <Field component={CustomInput} name={name} props={{ name, label }} />
}

export default TextFieldConnected
