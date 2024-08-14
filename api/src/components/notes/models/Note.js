const {mongoose} = require("../../../config/db/db");
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
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