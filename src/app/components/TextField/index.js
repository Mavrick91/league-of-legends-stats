// @flow

import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import type { fieldPropTypes } from 'redux-form'

type Props = {
  name: string,
  label?: string,
  className: {},
}

type customFieldPropTypes = Props & fieldPropTypes

const TextFieldStyled = styled.input`
  height: 100%;

  & > * {
    height: 100%;
  }
`

function CustomInput({ input, meta, name, label, ...restProps }: customFieldPropTypes) {
  return <TextFieldStyled type="text" label={label} id={name} {...input} {...restProps} />
}

function TextFieldConnected({ name, label, ...restProps }: Props) {
  return <Field component={CustomInput} name={name} props={{ name, label, ...restProps }} />
}

export default TextFieldConnected
