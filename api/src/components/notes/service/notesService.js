const NoteRepository = require('../repository/noteRepository');
const UserRepository = require('../../users/repository/userRepository');
const { NoteNotFoundError, BadRequestError } = require('../../../common/errors');

class NoteService {
  async getAllNotes(userId) {
    const notes = await NoteRepository.findNoteByUserId(userId);

    if (!notes || notes.length === 0) {
      throw new NoteNotFoundError('No se encontraron notas.');
    }

    return notes;
  }

  async createNote(userId, noteData) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new NoteNotFoundError('Usuario no encontrado');
    }

    const note = { ...noteData, user: userId };
    const result = await NoteRepository.create(note);

    if (!result) {
      throw new NoteNotFoundError('No se pudo crear la nota');
    }

    await UserRepository.addNoteToUser(user, result._id);

    return result;
  }

  async getNoteById(userId, noteId) {
    const note = await NoteRepository.findNoteById({ _id: noteId, user: userId });

    if (!note) {
      throw new NoteNotFoundError('Nota no encontrada');
    }

    return note;
  }

  async updateNote(userId, noteId, noteData) {
    if (!noteData.title || !noteData.body) {
      throw new BadRequestError('Title or Body fields cannot be empty');
    }

    const updatedNote = await NoteRepository.update(
      { _id: noteId, user: userId },
      { ...noteData },
      { new: true }
    );

    if (!updatedNote) {
      throw new NoteNotFoundError('No se pudo actualizar la nota');
    }

    return updatedNote;
  }

  async deleteNote(userId, noteId) {
    const result = await NoteRepository.delete({ _id: noteId, user: userId });

    if (!result) {
      throw new NoteNotFoundError('No se encontró la nota para eliminar');
    }

    return result;
  }
}

module.exports = new NoteService