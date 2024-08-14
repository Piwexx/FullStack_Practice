const supertest = require("supertest")
const {app} = require('../../../../app')

const api = supertest(app)


const initialNotes = [
  {
    title:"JavaScript",
    body:"Test 1"
  },
  {
    title:"Java",
    body:"Test 2"
  }
]

module.exports = {
  initialNotes,
  api
}