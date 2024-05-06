const mongoose = require('mongoose');


class Database {
  constructor() {
    this.connection = null;
  }

  async connectDB(){
      try {
        if(!this.connection){
          this.connection = await mongoose.connect(process.env.MONGO_URI,{dbName: process.env.MONGO_DB});
          console.log('Connected to MongoDB');
        }
        return this.connection;
      } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
      }
  };
}


module.exports = new Database();