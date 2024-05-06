beforeEach(async ()=>{
   await deleteAll()

   for (const note of notes){
      await saveNote(note)
   }
})

afterAll(async()=>{
   server.close()
})