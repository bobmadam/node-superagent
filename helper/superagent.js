/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
const client = require('superagent')
const logger = require('./logger')

function parse(jsonString) {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    return false
  }
}

async function get(path) {
  try {
    const response = await client
      .get(path)
      .timeout({
        response: 5000,
        deadline: 5000,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    if (response.ok) {
      return parse(response.text)
    }
    if (response.statusCode != 200) {
      return parse(response.text)
    }
    logger.error('Response Nok')
    return false
  } catch (e) {
    try {
      if (!e.response.text) {
        return false
      }
    } catch (err) {
      logger.error(JSON.stringify(err))
      return false
    }
    return parse(e.response.text)
  }
}

async function post(path, msg = '') {
  try {
    const response = await client
      .post(path)
      .timeout({
        response: 5000,
        deadline: 5000,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(msg)
    if (response.ok) {
      return parse(response.text)
    }
    if (response.statusCode != 200 && response.statusCode != 201) {
      return parse(response.text)
    }
    return false
  } catch (e) {
    try {
      if (!e.response.text) {
        return false
      }
    } catch (err) {
      logger.error(JSON.stringify(err))
      return false
    }
    return parse(e.response.text)
  }
}

async function put(path, msg = '') {
  try {
    const chatsResponse = await client
      .put(path)
      .timeout({
        response: 5000,
        deadline: 5000,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(msg)
    if (chatsResponse.ok) {
      return parse(chatsResponse.text)
    }
    if (chatsResponse.statusCode != 200 && chatsResponse.statusCode != 201) {
      return parse(chatsResponse.text)
    }
    return false
  } catch (e) {
    try {
      if (!e.response.text) {
        return false
      }
    } catch (err) {
      logger.error(err)
      return false
    }
    return parse(e.response.text)
  }
}

async function del(path, msg = '') {
  try {
    const chatsResponse = await client
      .del(path)
      .timeout({
        response: 5000,
        deadline: 5000,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(msg)
    if (chatsResponse.ok) {
      return true
    }
    logger.error('Response Nok')
    return false
  } catch (e) {
    try {
      if (!e.response.text) {
        return false
      }
    } catch (e) {
      logger.error(e)
      return false
    }
    return parse(e.response.text)
  }
}

module.exports = {
  get,
  post,
  put,
  del,
}
