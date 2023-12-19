/* eslint-disable consistent-return */
const express = require('express')

const router = express.Router()

const httpResp = require('../helper/httpResp')
const superagent = require('../helper/superagent')

const BASE_URL = 'https://jsonplaceholder.typicode.com' // Example Free Mock API

router.get('/all', async (req, res, next) => {
  const PATH = '/posts'
  const getData = await superagent.get(`${BASE_URL}${PATH}`)

  res.locals.status = httpResp.HTTP_OK
  res.locals.response.rc = httpResp.HTTP_OK
  res.locals.response.rd = `SUCCESS`
  res.locals.response.data = getData

  next()
})

router.get('/specific', async (req, res, next) => {
  const { id } = req.query
  res.locals.status = httpResp.HTTP_OK
  res.locals.response.rc = httpResp.HTTP_OK
  res.locals.response.rd = `SUCCESS`
  res.locals.response.data = {}
  const PATH = `/posts/${id}`

  const getData = await superagent.get(`${BASE_URL}${PATH}`)
  if (!getData.id) {
    res.locals.response.rd = 'SUCCESS, NOT FOUND'
  } else {
    res.locals.response.data = getData
  }

  next()
})

router.post('/create', async (req, res, next) => {
  const { title, body, userId } = req.body
  res.locals.status = httpResp.HTTP_CREATED
  res.locals.response.rc = httpResp.HTTP_CREATED
  res.locals.response.rd = `SUCCESS`
  res.locals.response.data = {}
  const PATH = `/posts`

  const insertData = await superagent.post(`${BASE_URL}${PATH}`, { title, body, userId })

  if (insertData) {
    res.locals.response.data = insertData
  } else {
    res.locals.response.rc = httpResp.HTTP_CREATED
    res.locals.response.rd = `SUCCESS`
  }

  next()
})

router.put('/update', async (req, res, next) => {
  const { id, title, body, userId } = req.body
  res.locals.status = httpResp.HTTP_ACCEPTED
  res.locals.response.rc = httpResp.HTTP_ACCEPTED
  res.locals.response.rd = `SUCCESS`
  const PATH = `/posts/${id}`

  const getData = await superagent.get(`${BASE_URL}${PATH}`)
  if (!getData.id) {
    res.locals.status = httpResp.HTTP_BADREQUEST
    res.locals.response.rc = httpResp.HTTP_BADREQUEST
    res.locals.response.rd = `User Not Found`
    return next()
  }

  const updateData = await superagent.put(`${BASE_URL}${PATH}`, {
    id,
    title: title !== undefined ? title : getData.title,
    body: body !== undefined ? body : getData.body,
    userId: userId !== undefined ? userId : getData.userId,
  })

  res.locals.response.data = updateData

  next()
})

router.delete('/delete', async (req, res, next) => {
  const { id } = req.body
  res.locals.status = httpResp.HTTP_GENERALERROR
  res.locals.response.rc = httpResp.HTTP_GENERALERROR
  res.locals.response.rd = `ERROR`
  const PATH = `/posts/${id}`

  const getData = await superagent.get(`${BASE_URL}${PATH}`)
  if (!getData.id) {
    res.locals.status = httpResp.HTTP_BADREQUEST
    res.locals.response.rc = httpResp.HTTP_BADREQUEST
    res.locals.response.rd = `User Not Found`
    return next()
  }

  const deleteProfile = await superagent.del(`${BASE_URL}${PATH}`, {})
  if (deleteProfile === true) {
    res.locals.status = httpResp.HTTP_ACCEPTED
    res.locals.response.rc = httpResp.HTTP_ACCEPTED
    res.locals.response.rd = 'SUCCESS'
  }

  next()
})
module.exports = router
