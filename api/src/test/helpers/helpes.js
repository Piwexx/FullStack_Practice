const {app,server} = require('../../../app')
const userRepository = require('../../repositories/userRepository');
const supertest = require('supertest')
const api = supertest(app)


//Notes
const notes = [{
    title:"Curso CSS",
    body: "Curso CSS",
    user:"66219bd69bebb26c7253af32"
    },
    {
    title:"Curso HTML",
    body: "Curso HTML",
    user:"66219bd69bebb26c7253af32"
    }
 ]

  const deleteAll = async()=>{
    await Note.deleteMany({})
  }

  const saveNote = async (note)=>{
    const noteUno = new Note(note)
    await noteUno.save()
  }


 const getAllContentNotes = async() => {
    const response = await api.get('/notes/all')
    const contents = response.body.map(note => note.body)

    return {response,contents}

 }

 //User

 const deleteAllUsers = async()=>{
  await  await userRepository.deleteAll()
}

const saveUser = async (username,name,password)=>{
  const user = userRepository.createUser({username,password,name})
  return user
}
 
const getAllUsers = async()=>{
  const users = await userRepository.getAll()
  return users
}

module.exports = {app,server,deleteAllUsers,saveUser,getAllUsers}