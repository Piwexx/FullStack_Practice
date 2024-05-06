const {mongoose} = require("../db/db");
const {model,Schema} = mongoose
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = Schema({
    name:{
      type:String,
      required: true
    },
    password:{
        type:String,
        required:true
    },
    username:{
      type:String,
      required:true,
      unique: true
    },
    notes:[{
        type:Schema.Types.ObjectId,
        ref:"Note"
    }]
})

userSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v; 
      delete ret.password;
      return ret;
    }
})

userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password,salt)
    this.password = hashPassword
  } catch (error) {
    next(error);
  }
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, username: this.username },
    process.env.SECRET,
    {
      expiresIn:'7d',
    }
  )
}

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const User = model("User",userSchema)

module.exports = User