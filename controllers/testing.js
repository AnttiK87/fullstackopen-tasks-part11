// Resets testin db for E2E testing purposes

// Dependencies
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  console.log(process.env.NODE_ENV)
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
  console.log('all deleted')
})

module.exports = router
