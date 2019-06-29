// @flow

import * as React from 'react'

type Props = {
  children: React.Node,
}

const rrd = require('react-router-dom')

rrd.BrowserRouter = ({ children }: Props) => <div>{children}</div>

module.exports = rrd
