const {app,server} = require('../../../app')
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
  await  await User.deleteMany({})
}

const saveUser = async (username,name,password)=>{
  const hashedPassword = await bcrypt.hash(password,10)
  const user = new User({username,name,password:hashedPassword})
  await  user.save()
}
 
const getAllUsers = async()=>{
  const users = await User.find({})
  return users
}

module.exports = {}