const mongoose = require('mongoose');
const {model,Schema} = mongoose


const noteSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  body: {
    type: String,
    required: true 
  },
  userId: {
    type: Number,
    required: true 
  }
  });

  noteSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v; 
      return ret;
    }
  });

const Note = model('Note', noteSchema);

module.exports = Note