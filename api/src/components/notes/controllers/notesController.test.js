//Test de integración 
const mongoose = require('mongoose')
const {startServer} = require('../../../../app')
const noteRepository = require("../repository/noteRepository")
const {initialNotes, api} = require('../../../test/helpers/helper_notes')

let server 
let token


beforeAll(async() => {
 server = await startServer()

 //Crear usuario
 //Recuperar usuario
 //Eliminar notas
 noteRepository.deleteAll()
 //Agregar notas
 noteRepository.create(initialNotes[0])
 //recuperar id
 noteRepository.create(initialNotes[1])
});

afterAll(async () => {
  mongoose.connection.close()
  server.close();
});

describe("Notes",()=>{

  test('notes are returned as json ', async() => {
   await api
      .get('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type',/^application\/json/)
  
  });

  test('there are two notes ', async() => {  
    const response = await api
      .get('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type',/^application\/json/)
  
      expect(response.body).toHaveLength(initialNotes.length)
  });

  test('the second note is about Java ', async() => {  
    const response = await api
      .get('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type',/^application\/json/)
  
      const titles = response.body.map(note => note.title)
      expect(titles).toContain('Java')
  });
  test('a valid note can be added ', async() => {  
    const newNote = {
      title : "PHP",
      body  : "Test 3"
    }

     await api
      .post('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(newNote)
      .expect(200)
      .expect('Content-Type',/^application\/json/)
  
      const response = await api
                            .get('/api/v1/notes')
                            .set('Authorization', `Bearer ${token}`)

      const titles = response.body.map(note => note.title)
      expect(titles).toHaveLength(initialNotes.length + 1)
      expect(titles).toContain(newNote.title)
  });
  test('note without title is no added', async() => {  
    const newNote = {
      title : "C#",
    }

     await api
      .post('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(newNote)
      .expect(400)
  
      const response = await api
                            .get('/api/v1/notes')
                            .set('Authorization', `Bearer ${token}`)

      expect(response.body).toHaveLength(initialNotes.length + 1)
  });
})


//https://www.youtube.com/watch?v=_xxVJdGNMrs
// min 30