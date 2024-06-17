const BaseRepository = require('./baseRepository');
const NoteModel = require('../../models/Note');

class NoteRepository extends BaseRepository {
  constructor() {
    super(NoteModel);
  }

  async findNoteByUserId(id) {
    return this.model.find({user:id})
                     .populate('user', 'username name')
                     .exec()
      
  }

  async findNoteById(ids) {
    return this.model.find(ids)
                     .populate('user', 'username name')
                     .exec()
      
  }

  async createNote(noteData) {
    
    const note = new this.model(noteData)
    const result = await note.save();

    return result
  }

  async updateNote(ids,data,config) {
    return  this.model.findOneAndUpdate(ids,data,config);
 }
  async deleteNote(ids) {
    return  this.model.findOneAndDelete(ids);
}

}



module.exports = new NoteRepository();