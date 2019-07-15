/*eslint-disable*/

export function set(target, path, value, options) {
  if (!isObject(target)) {
    return target
  }

  let opts = options || {}
  const isArray = Array.isArray(path)
  if (!isArray && typeof path !== 'string') {
    return target
  }

  let merge = opts.merge
  if (merge && typeof merge !== 'function') {
    merge = Object.assign
  }

  const keys = (isArray ? path : split(path, opts)).filter(isValidKey)
  const len = keys.length
  const orig = target

  if (!options && keys.length === 1) {
    result(target, keys[0], value, merge)
    return target
  }

  for (let i = 0; i < len; i++) {
    let prop = keys[i]

    if (!isObject(target[prop])) {
      target[prop] = {}
    }

    if (i === len - 1) {
      result(target, prop, value, merge)
      break
    }

    target = target[prop]
  }

  return orig
}

function createKey(pattern, options) {
  let id = pattern
  if (typeof options === 'undefined') {
    return `${id}`
  }
  const keys = Object.keys(options)
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    id += `;${key}=${String(options[key])}`
  }
  return id
}

function result(target, path, value, merge) {
  if (merge) {
    target[path] = merge({}, target[path], value)
  } else {
    target[path] = value
  }
}

function isValidKey(key) {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype'
}

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function')
}

function split(path, options) {
  const id = createKey(path, options)
  if (set.memo[id]) return set.memo[id]

  const char = options && options.separator ? options.separator : '.'
  let keys = []
  let res = []

  if (options && typeof options.split === 'function') {
    keys = options.split(path)
  } else {
    keys = path
      .replace('[', char)
      .replace(']', '')
      .split(char)
  }

  for (let i = 0; i < keys.length; i++) {
    let prop = keys[i]
    while (prop && prop.slice(-1) === '\\' && keys[i + 1]) {
      prop = prop.slice(0, -1) + char + keys[++i]
    }
    res.push(prop)
  }
  set.memo[id] = res
  return res
}

set.memo = {}
