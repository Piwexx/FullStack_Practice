const BaseRepository = require('./baseRepository');
const UserModel = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }

  async findById(id) {
    return this.model.findOne({_id:id})
                     .populate('notes', 'title body')
                     .exec();;
      
  }

  async findByUsername(username) {
    return this.model.findOne({username})
                     .select('username name password')
  }

  async createUser(userData) {
    
    const user = new this.model(userData)
    const result = await user.save();

    return result
  }

  async updateUserById(ids,data,config) {
    return this.model.findOneAndUpdate(ids,data,config);
  }

  async deleteUserById(id) {
    return this.model.findOneAndDelete(id);
  }

  async comparePassword(user,password) {
    return user.comparePassword(password);
  }

   createToken(user) {
    return user.createJWT();
  }
  
  async addNoteToUser(user,idNote) {
    user.notes.push(idNote);
    await user.save();
  }
}

module.exports = new UserRepository();