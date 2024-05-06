const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connection = null;
  }

  async connectDB(){
    try {
      if (!this.connection) {
        this.connection = await mongoose.connect(process.env.MONGO_URI, {
          dbName: process.env.NODE_ENV === 'test' ? process.env.MONGO_DB_TEST : process.env.MONGO_DB
        });
      }
      return this.connection;
    } catch (err) {
      throw new Error('No se pudo conectar con la base de datos');
    }
  }

  async closeDB() {
    try {
      if (this.connection) {
        await this.connection.disconnect();
      }
    } catch (error) {
      throw new Error('No se pudo cerrar la conexión');
    }
  }
}

module.exports = {
  mongoose: mongoose,
  db: new Database()
};